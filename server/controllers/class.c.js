const jwt = require('jsonwebtoken');

const mailer = require('../utils/mailer');
const invitationM = require('../models/invitation.m');
const classM = require('../models/class.m');

exports.postCreateClass = async (req, res) => {
    const { name, part, topic, room } = req.body.classInfo;

    try {
        const classes = await classM.getAllClasses();

        let id;
        if (!classes || !classes?.length) {
            id = 0;
        } else {
            id = classes[classes.length - 1].class_id + 1;
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
            class_id: id,
            lecturer_id,
            class_name: name,
            part,
            topic,
            room,
        };
        // console.log(newClass);
        const result = await classM.addNewClass(newClass);
    } catch (error) {
        console.log(error);
    }
};

// invite students

exports.postInviteStudents = async (req, res) => {
    const { emails, classID } = req.body.data;

    if (!classID || !emails || !emails?.length) {
        console.log('Invalid class ID or emails!');
        return res.status(400).json({ message: 'Invalid class ID or emails!' });
    }

    try {
        const classInfo = await classM.getClassByID(classID);

        emails.map(async (email) => {
            const token = jwt.sign({ email }, process.env.INVITE_KEY);

            await invitationM.addNewInvitation({ email, token });
            await mailer.sendClassInvitaion(email, classInfo, token);
        });

        res.status(200).json({ message: 'Invitations have been sent successfully' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Something went wrong!' });
    }
};

exports.getClassData = async (req, res) => {
    const { classID, userID } = req.params;

    if (!classID) {
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
    const { classData, user_id, role } = req.body.data;

    try {
        if (!classData || user_id === undefined || !role) {
            console.log('class data, user or role is invalid');
            return res.status(400).json({ message: 'Invalid data sent' });
        }

        const allMembers = await classM.getAllMembersInClass();

        if (!allMembers) {
            console.log('something went wrong');
        }

        let id;
        if (allMembers.length === 0) {
            id = 0;
        } else {
            id = allMembers[allMembers.length - 1].id + 1;
        }

        const data = {
            id,
            ...classData,
            member_id: user_id,
            role,
        };

        await classM.addStudentIntoClass(data);
        res.status(200).json({ message: 'Add member to class successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ messag: 'Something went wrong!' });
    }
};

// https://classroom.google.com/u/1/invite/accept_token/NjQ1MTQwOTM2MDM2?role=3&t=a3doo5l7gy6bbnq4&pli=1
