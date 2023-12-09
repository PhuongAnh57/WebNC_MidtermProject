const jwt = require('jsonwebtoken');

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
            room
        }
        // console.log(newClass);
        const result = await classM.addNewClass(newClass);

    } catch (error) {
        console.log(error);
    }
};
