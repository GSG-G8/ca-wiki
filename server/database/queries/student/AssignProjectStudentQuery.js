const connection = require('../../connection');

const AssignProjectStudentQuery = (data) => {
  const { studentId, projectId } = data;
  return connection.query(
    'INSERT INTO student_project (student_id , project_id) VALUES ($1, $2)',
    [studentId, projectId],
  );
};

module.exports = AssignProjectStudentQuery;
