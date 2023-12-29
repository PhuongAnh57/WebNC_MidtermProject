const db = require('../configs/database');

module.exports = {
    getAllAssignments: async () => {
        const result = await db.any('SELECT * FROM assignments ORDER BY id ASC');
        return result;
    },
    getAssignmentsByClass: async (classID) => {
        const result = await db.one('SELECT * FROM assignments WHERE class_id=$1', [classID]);
        return result;
    },
    getDetailAssignment: async (assignmentID, classID) => {
        const result = await db.one('SELECT * FROM assignments WHERE id=$1 and class_id=$2', [assignmentID, classID]);
        return result;
    },
    addNewAssignment: async (assignment) => {
        const result = await db.one(
            'INSERT INTO assignments(id, classid, title, instruction, file_urls, students, grade_category, points, due_date, topic, rubric) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [
                assignment.id,
                assignment.class_id,
                assignment.title,
                assignment.instruction,
                assignment.file_urls,
                assignment.students,
                assignment.grade_category,
                assignment.points,
                assignment.due_date,
                assignment.topic,
                assignment.rubric,
            ],
        );

        return result;
    },
    editAssignment: async (assignment) => {
        await db.one(
            'UPDATE assignments SET title=$1, instruction=$2, file_urls=$3, students=$4, grade_category=$5, points=$6, due_date=$7, topic=$8, rubric=$9 WHERE id=$10 and class_id=$11',
            [
                assignment.title,
                assignment.instruction,
                assignment.file_urls,
                assignment.students,
                assignment.grade_category,
                assignment.points,
                assignment.due_date,
                assignment.topic,
                assignment.rubric,
                assignment.id,
                assignment.class_id,
            ],
        );
    },
    removeAssignment: async (assignmentID, classID) => {
        await db.none('DELETE FROM assignments WHERE id=$1 and class_id=$2', [assignmentID, classID]);
    },
};
