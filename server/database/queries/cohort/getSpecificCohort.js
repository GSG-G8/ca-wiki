const connection = require('../../config/connection');

const getCohortQuery = (id) =>
  connection.query('select * from cohort where id = $1', [id]);

module.exports = getCohortQuery;
