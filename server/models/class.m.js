const db = require('../configs/database');

module.exports = {
    getAllClasses: async () => {
        const result = await db.any('SELECT * FROM classes ORDER BY class_id ASC');
        return result;
    },
    getClassByID: async (id) => {
        const result = await db.one('SELECT * FROM classes WHERE class_id=$1', [id]);
        return result;
    },
    addNewClass: async (classData) => {
        const result = await db.one(
            'INSERT INTO classes(class_id, lecturer_id, class_name, part, topic, room) VALUES VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [
                classData.class_id,
                classData.lecturer_id,
                classData.class_name,
                classData.part,
                classData.topic,
                classData.room,
            ],
        );
        return result;
    },
    getAllMembersInClass: async (classID) => {
        const result = await db.any('SELECT * FROM class_members WHERE class_id=$1', [classID]);
        return result;
    },
    getMemberInClass: async (classID, memberID) => {
        const result = await db.one('SELECT * FROM class_members WHERE class_id=$1 and member_id=$2', [
            classID,
            memberID,
        ]);
        return result;
    },
    addStudentIntoClass: async (data) => {
        const result = await db.one(
            'INSERT INTO class_members(id, class_id, member_id, role) VALUES($1, $2, $3, $4) RETURNING *',
            [data.id, data.class_id, data.member_id, data.role],
        );
        return result;
    },

    // removeToken: async (id) => {
    //     await db.none('DELETE FROM access_tokens WHERE user_id=$1', [id]);
    // },
};
