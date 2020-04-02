const connection = require('../../config/connection');

const getProjectById = (id) =>
  connection.query('SELECT * FROM project WHERE id = $1', [id]);

module.exports = getProjectById;
