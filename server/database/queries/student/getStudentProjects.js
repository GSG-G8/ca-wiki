const connection = require('../../connection');

const getStudentProjectsQuery = (id) =>
  connection.query(
    'SELECT * FROM project INNER JOIN student_project ON project.id = student_project.student_id WHERE student_id = $1',
    [id],
  );
module.exports = getStudentProjectsQuery;
