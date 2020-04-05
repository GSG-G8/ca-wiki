const connection = require('../../config/connection');

const getStudentByIdQuery = (id) =>
  connection.query('SELECT * FROM student WHERE id = $1', [id]);

module.exports = getStudentByIdQuery;
