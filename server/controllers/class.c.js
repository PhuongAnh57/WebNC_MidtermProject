const jwt = require('jsonwebtoken');

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
        const classes = await classM.getAllClasses();
        const hasCourse = classes.find(c => c.lecturer_id === userID);
        if (!hasCourse) {
            res.json({ message: 'User does not have any courses' });
        } else {
            const classesData = classes.filter(c => c.lecturer_id === userID);
            res.json({ message: 'Classes', classesData });
        }
    } catch (error) {
        console.log(error);
    }
}

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
            room
        }
        // console.log(newClass);
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
            role: 'teacher'
        }
        const nClass_Lecturer = await classM.addNewClass_Member(newClass_Lecturer);
        res.json({ message: 'class_id', class_id });
    } catch (error) {
        console.log(error);
    }
};

exports.getClassDetail = async (req, res) => {
    const classID  = req.params.classID;
    
    try {
        const classes = await classM.getAllClasses();
        const Class = classes.find(c => c.class_id === +classID);
        res.json({message: 'class-detail', Class});
    } catch (error) {
        console.log(error);
    }
}