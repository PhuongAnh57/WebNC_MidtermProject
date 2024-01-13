const resourceM = require('../models/resource.m');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require('firebase/storage');
const config = require('../configs/firebase');
const classM = require('../models/class.m');

// initialize a firebase application
initializeApp(config.firebaseConfig);

// initialize cloud storage and get a reference to the service
const storage = getStorage();

// const currentDateTime = () => {
//     const today = new Date();
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
//     return date + ' ' + time;
// };

const uploadFileToFirebase = async (file, path) => {
    const storageRef = ref(storage, `${path + file.originalname}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: file.mimetype,
    };

    // Upload file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
};

const formatArray = (originalArray) => `{${originalArray.map((value) => `${value}`).join(',')}}`;

exports.postAddResource = async (req, res) => {
    const { resource } = req.body;
    const { classID } = req.params;

    if (!classID || !resource) {
        console.log('class id or resource is undefined');
        return res.status(400).json({ message: 'class id or resource is undefined' });
    }
    try {
        const allResource = await resourceM.getAllResources();
        let id;
        if (!allResource || !allResource?.length) {
            id = 0;
        } else {
            id = allResource[allResource.length - 1].id + 1;
        }

        let newResource = {
            ...resource,
            id,
            class_id: classID,
            file_urls: formatArray([]),
            students: formatArray([]),
            grade_category: resource.gradeCategory,
            due_date: resource.dueDate,
        };

        // Add new resource
        const result = await resourceM.addNewResource(newResource);
        res.status(200).json({ message: 'Create resource done', resource: result });
    } catch (err) {
        console.log(err);
    }
};

exports.postAddFile = async (req, res) => {
    const file = req.file;
    const { classID, resourceID } = req.params;

    let fileUrls = [];
    if (file) {
        try {
            // Use Promise.all to wait for all uploads to finish
            // fileUrls = await Promise.all(
            //     file.map(async (file) => {
            //         const url = await uploadFileToFirebase(classID, id, file,
            // `resources/${'class' + classID}/attach/`,
            // );
            //         return url;
            //     }),
            // );

            const resource = await resourceM.getDetailResource(resourceID, classID);

            if (!resource) {
                console.log('resource not found');
                return res.status(400).json({ message: 'resource not found' });
            }

            const url = await uploadFileToFirebase(file, `resources/${'class-' + classID}/attach/`);
            fileUrls.push(url);

            const newResource = {
                ...resource,
                file_urls: formatArray(fileUrls),
            };

            await resourceM.editResource(newResource);
            const result = await resourceM.getDetailResource(resourceID, classID);

            return res.status(200).json({ message: 'Upload file done', resource: result });
        } catch (err) {
            console.log('Error uploading file', err);
            return res.status(400).json({ message: 'Something went wrong' });
        }
    }
};

exports.getResourcesOfClass = async (req, res) => {
    const { classID } = req.params;

    if (!classID) {
        console.log('class id is undefined');
        res.status(400).json({ message: 'class id is undefined' });
    }

    try {
        const resources = await resourceM.getResourcesByClass(classID).catch((err) => {});

        if (!resources) {
            res.status(400).json({ message: 'Resource not found' });
        } else {
            res.status(200).json({ message: 'Resource found', resources });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

exports.getDetailResource = async (req, res) => {
    const { classID, resourceID } = req.params;

    if (!classID || !resourceID) {
        console.log('classid or resource id is undefined');
        res.status(400).json({ message: 'class id or resource id is undefined' });
    }

    try {
        const resource = await resourceM.getDetailResource(resourceID, classID).catch((err) => {});
        // handle file url
        const teacher = await classM.getTeacherByClass(classID);

        if (!resource) {
            res.status(400).json({ message: 'Resource not found' });
        } else {
            resource['owner_id'] = teacher.user_id;
            resource['owner_firstName'] = teacher.first_name;
            resource['owner_lastName'] = teacher.last_name;

            res.status(200).json({ message: 'Resource found', resource });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

exports.putEditResource = async (req, res) => {
    const { classID, resourceID } = req.params;
    const { newResource } = req.body;

    if (!classID || !resourceID || !newResource) {
        console.log('class id, resource id or new resource is undefined');
        res.status(400).json({ message: 'class id, resource id or new resource is undefined' });
    }

    try {
        // load resource to check attached file
        const oldResource = await resourceM.getDetailResource(resourceID, classID).catch((err) => {});

        if (!oldResource) {
            return res.status(400).json({ message: 'Resource not found' });
        }

        // if there are changes in attached file, make changes in firebase storage.
        if (oldResource.file_urls && oldResource.file_urls?.length) {
            oldResource.file_urls.forEach((url) => {
                const deleteStorageRef = ref(storage, url);
                deleteObject(deleteStorageRef);
            });
        }

        const newFiles = req.file;
        let fileUrls = [];

        if (newFiles) {
            try {
                // Use Promise.all to wait for all uploads to finish
                fileUrls = await Promise.all(
                    file.map(async (file) => {
                        const url = await uploadFileToFirebase(file, 'resources/attach/');
                        return url;
                    }),
                );
            } catch (err) {
                console.log('Error uploading file', err);
            }
        }

        const newResource = {
            id,
            class_id: classID,
            ...newResource,
            file_urls: fileUrls,
        };

        await resourceM.editResource(newResource);

        res.status(200).json({ message: 'Edit successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

exports.deleteRemoveResource = async (req, res) => {
    const { classID, resourceID } = req.params;

    if (!classID || !resourceID) {
        console.log('classid or resource id is undefined');
        res.status(400).json({ message: 'class id or resource id is undefined' });
    }

    try {
        // handle delete file url
        await resourceM.removeResource(resourceID, classID).catch((err) => {});

        res.status(200).json({ message: 'Resource deleted' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};
