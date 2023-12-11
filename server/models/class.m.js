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
    getClassByID: async (class_id) => {
        const result = await db.one('SELECT * FROM classes WHERE class_id=$1', [class_id]);
        return result;
    },
}