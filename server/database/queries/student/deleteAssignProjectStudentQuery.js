const connection = require('../../connection');

const deleteAssignProjectStudentQuery = (data) => {
  const { projectId, deletedStudent } = data;
  return connection.query(
    'DELETE FROM student_project WHERE student_id = $2 AND project_id = $1 OR student_id = $3 AND project_id = $1 OR student_id = $4 AND project_id = $1 OR student_id = $5 AND project_id = $1;',
    [
      projectId,
      deletedStudent[0],
      deletedStudent[1],
      deletedStudent[2],
      deletedStudent[3],
    ],
  );
};

module.exports = deleteAssignProjectStudentQuery;
