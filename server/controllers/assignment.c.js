const assignmentM = require('../models/assignment.m');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require('firebase/storage');
const config = require('../configs/firebase');

// initialize a firebase application
initializeApp(config.firebaseConfig);

// initialize cloud storage and get a reference to the service

const storage = getStorage();
// const bucket = storage.bucket();

const currentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time;
};

const uploadFileToFirebase = async (classID, id, file, path) => {
    const datetime = currentDateTime();
    const storageRef = ref(storage, `${path + classID + '-' + id + '-' + file.originalname + '      ' + datetime}`);

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

exports.postAddAssignment = async (req, res) => {
    const { assignment } = req.body;
    const { classID } = req.params;

    if (!classID || !assignment) {
        console.log('class id or assignment is undefined');
        return res.status(400).json({ message: 'class id or assignment is undefined' });
    }

    try {
        const allAssignment = await assignmentM.getAllAssignments();

        let id;
        if (!allAssignment || !allAssignment?.length) {
            id = 0;
        } else {
            id = allAssignment[allAssignment.length - 1].id + 1;
        }

        const files = req.files;
        let fileUrls = [];

        if (files) {
            try {
                // Use Promise.all to wait for all uploads to finish
                fileUrls = await Promise.all(
                    files.map(async (file) => {
                        const url = await uploadFileToFirebase(classID, id, file, 'assignments/attach/');
                        return url;
                    }),
                );
            } catch (err) {
                console.log('Error uploading files', err);
            }
        }

        const newAssignment = {
            id,
            class_id: classID,
            ...assignment,
            file_urls: fileUrls,
        };

        // Add new assignment
        await assignmentM.addNewAssignment(newAssignment);

        res.status(200).json({ message: 'Create assignment done', fileUrls });
    } catch (err) {
        console.log(err);
    }
};

exports.getAssignmentsOfClass = async (req, res) => {
    const { classID } = req.params;

    if (!classID) {
        console.log('class id is undefined');
        res.status(400).json({ message: 'class id is undefined' });
    }

    try {
        const assignments = await assignmentM.getAssignmentsByClass(classID).catch((err) => {});
        // handle file url

        if (!assignments) {
            res.status(400).json({ message: 'Assignment not found' });
        } else {
            res.status(200).json({ message: 'Assignment found', assignments });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

exports.getDetailAssignment = async (req, res) => {
    const { classID, assignmentID } = req.params;

    if (!classID || !assignmentID) {
        console.log('classid or assignment id is undefined');
        res.status(400).json({ message: 'class id or assignment id is undefined' });
    }

    try {
        const assignment = await assignmentM.getDetailAssignment(assignmentID, classID).catch((err) => {});
        // handle file url

        if (!assignment) {
            res.status(400).json({ message: 'Assignment not found' });
        } else {
            res.status(200).json({ message: 'Assignment found', assignment });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

exports.putEditAssignment = async (req, res) => {
    const { classID, assignmentID } = req.params;
    const { newAssignment } = req.body;

    if (!classID || !assignmentID || !newAssignment) {
        console.log('class id, assignment id or new assignment is undefined');
        res.status(400).json({ message: 'class id, assignment id or new assignment is undefined' });
    }

    try {
        // load assignment to check attached files
        const oldAssignment = await assignmentM.getDetailAssignment(assignmentID, classID).catch((err) => {});

        if (!oldAssignment) {
            return res.status(400).json({ message: 'Assignment not found' });
        }

        // if there are changes in attached files, make changes in firebase storage.
        if (oldAssignment.file_urls && oldAssignment.file_urls?.length) {
            oldAssignment.file_urls.forEach((url) => {
                const deleteStorageRef = ref(storage, url);
                deleteObject(deleteStorageRef);
            });
        }

        const newFiles = req.files;
        let fileUrls = [];

        if (newFiles) {
            try {
                // Use Promise.all to wait for all uploads to finish
                fileUrls = await Promise.all(
                    files.map(async (file) => {
                        const url = await uploadFileToFirebase(classID, id, file, 'assignments/attach/');
                        return url;
                    }),
                );
            } catch (err) {
                console.log('Error uploading files', err);
            }
        }

        const newAssignment = {
            id,
            class_id: classID,
            ...newAssignment,
            file_urls: fileUrls,
        };

        await assignmentM.editAssignment(newAssignment);

        res.status(200).json({ message: 'Edit successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

exports.deleteRemoveAssignment = async (req, res) => {
    const { classID, assignmentID } = req.params;

    if (!classID || !assignmentID) {
        console.log('classid or assignment id is undefined');
        res.status(400).json({ message: 'class id or assignment id is undefined' });
    }

    try {
        // handle delete file url
        await assignmentM.removeAssignment(assignmentID, classID).catch((err) => {});

        res.status(200).json({ message: 'Assignment deleted' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};
