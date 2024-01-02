const db = require('../configs/database');

module.exports = {
    getAllResources: async () => {
        const result = await db.any('SELECT * FROM resources ORDER BY id ASC');
        return result;
    },
    getResourcesByClass: async (classID) => {
        const result = await db.any('SELECT * FROM resources WHERE class_id=$1 ORDER BY id DESC', [classID]);
        return result;
    },
    getDetailResource: async (resourceID, classID) => {
        const result = await db.one('SELECT * FROM resources WHERE id=$1 and class_id=$2', [resourceID, classID]);
        return result;
    },
    addNewResource: async (resource) => {
        const result = await db.one(
            'INSERT INTO resources(id, class_id, title, instruction, type, file_urls, students, grade_category, points, date, due_date, topic, rubric) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
            [
                resource.id,
                resource.class_id,
                resource.title,
                resource.instruction,
                resource.type,
                resource.file_urls,
                resource.students,
                resource.grade_category,
                resource.points,
                resource.date,
                resource.due_date,
                resource.topic,
                resource.rubric,
            ],
        );

        return result;
    },
    editResource: async (resource) => {
        await db.none(
            'UPDATE resources SET title=$1, instruction=$2,type=$3, file_urls=$4, students=$5, grade_category=$6, points=$7, date=$8, due_date=$9, topic=$10, rubric=$11 WHERE id=$12 and class_id=$13',
            [
                resource.title,
                resource.instruction,
                resource.type,
                resource.file_urls,
                resource.students,
                resource.grade_category,
                resource.points,
                resource.date,
                resource.due_date,
                resource.topic,
                resource.rubric,
                resource.id,
                resource.class_id,
            ],
        );
    },
    removeResource: async (resourceID, classID) => {
        await db.none('DELETE FROM resources WHERE id=$1 and class_id=$2', [resourceID, classID]);
    },
};
