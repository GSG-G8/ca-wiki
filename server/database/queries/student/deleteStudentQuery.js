const connection = require('../../connection');

const deleteStudentQuery = (studentd) =>
  connection.query('DELETE FROM student WHERE id = $1', [studentd]);

module.exports = deleteStudentQuery;
