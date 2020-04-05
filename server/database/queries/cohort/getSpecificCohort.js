const connection = require('../../config/connection');

const getCohortQuery = (id) =>
  connection.query('SELECT * FROM cohort WHERE id = $1', [id]);

module.exports = getCohortQuery;
