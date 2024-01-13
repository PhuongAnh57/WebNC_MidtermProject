const db = require('../configs/database');

module.exports = {
    getAllClasses: async () => {
        const result = await db.any('SELECT * FROM classes ORDER BY class_id ASC');
        return result;
    },
    getOwnedClasses: async (userID) => {
        const result = await db.any(
            'SELECT * FROM class_members cm JOIN classes c ON cm.class_id = c.class_id WHERE member_id=$1 and role=$2 ',
            [userID, 'teacher'],
        );
        return result;
    },
    getJoinedClasses: async (userID) => {
        const result = await db.any(
            'SELECT * FROM class_members cm JOIN classes c ON cm.class_id = c.class_id WHERE member_id=$1 and role=$2 ',
            [userID, 'student'],
        );
        return result;
    },
    getClassByID: async (id) => {
        const result = await db.one('SELECT * FROM classes WHERE class_id=$1', [id]);
        return result;
    },
    getClassByCode: async (code) => {
        const result = await db.one('SELECT * FROM classes WHERE code=$1', [code]);
        return result;
    },
    addNewClass: async (classData) => {
        const result = await db.one(
            'INSERT INTO classes(class_id, code, lecturer_id, class_name, part, topic, room) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [
                classData.class_id,
                classData.code,
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
    getMemberByEmail: async (classID, email) => {
        const result = await db.one(
            'SELECT * FROM class_members cm JOIN accounts acc on cm.member_id = acc.user_id WHERE class_id=$1 and email =$2',
            [classID, email],
        );
        return result;
    },
    addStudentIntoClass: async (data) => {
        const result = await db.one(
            'INSERT INTO class_members(id, class_id, member_id, role) VALUES($1, $2, $3, $4) RETURNING *',
            [data.id, data.class_id, data.member_id, data.role],
        );
        return result;
    },

    getAllClass_Members: async () => {
        const result = await db.any('SELECT * FROM class_members ORDER BY id ASC');
        return result;
    },
    addNewClass_Member: async (class_member) => {
        const result = await db.one(
            'INSERT INTO class_members(id, class_id,  member_id, role) VALUES($1, $2, $3, $4) RETURNING *',
            [class_member.id, class_member.class_id, class_member.member_id, class_member.role],
        );
        return result;
    },
    removeMemberInClass: async (classID, userID) => {
        await db.none('DELETE FROM class_members WHERE class_id=$1 and member_id=$2', [classID, userID]);
    },
    removeMembersInClass: async (classID) => {
        await db.none('DELETE FROM class_members WHERE class_id=$1', [classID]);
    },
    removeClass: async (classID) => {
        await db.none('DELETE FROM classes WHERE class_id=$1', [classID]);
    },
};
