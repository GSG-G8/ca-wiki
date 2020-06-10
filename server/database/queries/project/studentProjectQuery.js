const connection = require('../../connection');

const studentProjectQuery = (projectId) =>
  connection.query(
    'SELECT student.name FROM student INNER JOIN student_project ON student_project.student_id = student.id WHERE project_id = $1 ORDER BY student.name',
    [projectId],
  );

module.exports = studentProjectQuery;
