const db = require('../configs/database');

module.exports = {
    getAllClasses: async () => {
        const result = await db.any('SELECT * FROM classes ORDER BY class_id ASC');
        return result;
    },
    addNewClass: async (Class) => {
        const result = await db.one(
            'INSERT INTO classes(class_id,  lecturer_id, class_name, part, topic, room) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [ Class.class_id, Class.lecturer_id, Class.class_name, Class.part, Class.topic, Class.room ]
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
            [ class_member.id, class_member.class_id,  class_member.member_id, class_member.role ]
        );
        return result;
    }
}