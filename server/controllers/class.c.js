const jwt = require('jsonwebtoken');

const mailer = require('../utils/mailer');
const invitationM = require('../models/invitation.m');
const classM = require('../models/class.m');
const userM = require('../models/user.m');

exports.getAllClasses = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.json({ message: 'Unauthorization' });
    }

    const userID = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodeValue) => {
        if (err) {
            res.json({ message: 'Invalid token' });
        } else {
            return decodeValue.id;
        }
    });

    try {
        const ownedClasses = await classM.getOwnedClasses(userID);
        const joinedClasses = await classM.getJoinedClasses(userID);

        if (!ownedClasses && !joinedClasses) {
            res.json({ message: 'User does not have any courses' });
        } else {
            const classesData = [...ownedClasses, ...joinedClasses];

            res.json({ message: 'Classes', classesData });
        }
    } catch (error) {
        console.log(error);
    }
};

exports.postCreateClass = async (req, res) => {
    const { name, part, topic, room } = req.body.classInfo;

    try {
        const classes = await classM.getAllClasses();

        let class_id;
        if (!classes || !classes?.length) {
            class_id = 0;
        } else {
            class_id = classes[classes.length - 1].class_id + 1;
        }

        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        const lecturer_id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodeValue) => {
            if (err) {
                res.json({ message: 'Invalid token' });
            } else {
                return decodeValue.id;
            }
        });

        const newClass = {
            class_id,
            lecturer_id,
            class_name: name,
            part,
            topic,
            room,
        };

        const nClass = await classM.addNewClass(newClass);

        //add lecturer to table class_members
        const class_members = await classM.getAllClass_Members();
        let id;
        if (!class_members || !class_members?.length) {
            id = 0;
        } else {
            id = class_members[class_members.length - 1].id + 1;
        }

        const newClass_Lecturer = {
            id,
            class_id,
            member_id: lecturer_id,
            role: '2',
        };
        const nClass_Lecturer = await classM.addNewClass_Member(newClass_Lecturer);
        res.json({ message: 'class_id', class_id });
    } catch (error) {
        console.log(error);
    }
};

exports.getClassDetail = async (req, res) => {
    const { classID } = req.params;

    try {
        const classes = await classM.getAllClasses();

        const Class = classes.find((c) => c.class_id === +classID);
        res.json({ message: 'class-detail', Class });
    } catch (error) {
        console.log(error);
    }
};

// invite students

exports.postInviteMembers = async (req, res) => {
    const { emails, classID, role } = req.body.data;

    if (classID === undefined || !emails || !emails.length || !role) {
        console.log('Invalid class ID or emails!');
        return res.status(400).json({ message: 'Invalid class ID or emails!' });
    }

    try {
        const classInfo = await classM.getClassByID(classID);

        emails.map(async (email) => {
            const token = jwt.sign({ email }, process.env.INVITE_KEY);

            await invitationM.addNewInvitation({ email, token, role });
            await mailer.sendClassInvitaion(email, classInfo, token, role);
        });

        res.status(200).json({ message: 'Invitations have been sent successfully' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Something went wrong!' });
    }
};

exports.getCheckUserExistInClass = async (req, res) => {
    const { classID, userID } = req.params;

    if (classID == undefined) {
        console.log('Undefined class id');
        return res.status(400).json({ message: 'Class ID is undefined' });
    }

    try {
        const classInfo = await classM.getClassByID(classID);

        if (!classInfo) {
            console.log('Class not found');
            return res.status(400).json({ message: 'Class not found' });
        }

        const checkUser = await classM.getMemberInClass(classID, userID).catch((err) => {});

        let classData = {};
        let message = '';

        if (!checkUser) {
            classData = {
                ...classInfo,
                joined: false,
            };
            message = 'Member not found';
        } else {
            classData = {
                ...classInfo,
                joined: true,
            };
            message = 'Member found';
        }

        return res.status(200).json({ message, classData });
    } catch (err) {
        console.log(err);
    }
};

exports.postAddMemberToClass = async (req, res) => {
    const { classData, user, role } = req.body.data;

    try {
        if (!classData || !user || !role) {
            console.log('class data, user or role is invalid');
            return res.status(400).json({ message: 'Invalid data sent' });
        }

        const allMembers = await classM.getAllMembersInClass(classData.class_id);

        if (!allMembers) {
            console.log('something went wrong');
        }

        let id;
        if (!allMembers || !allMembers?.length) {
            id = 0;
        } else {
            id = allMembers[allMembers.length - 1].id + 1;
        }

        const data = {
            id,
            ...classData,
            member_id: user.user_id !== undefined ? user.user_id.toString() : user.id.toString(),
            role,
        };

        await classM.addStudentIntoClass(data);
        await invitationM.removeInvitation(user.email);

        res.status(200).json({ message: 'Add member to class successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ messag: 'Something went wrong!' });
    }
};

exports.getAllMembers = async (req, res) => {
    const classID = req.params.classID;

    try {
        const members = await classM.getAllMembersInClass(classID);

        const lecturerData = [];
        const studentData = [];

        for (let i = 0; i < members.length; i++) {
            const member = await userM.getUserByID(members[i].member_id);
            const data = {
                firstname: member.first_name,
                lastname: member.last_name,
                role: members[i].role,
            };

            if (members[i].role === '2') {
                lecturerData.push(data);
            } else if (members[i].role === '3') {
                studentData.push(data);
            }
        }
        res.json({ message: 'members', lecturerData, studentData });
    } catch (error) {
        console.log(error);
    }
};
