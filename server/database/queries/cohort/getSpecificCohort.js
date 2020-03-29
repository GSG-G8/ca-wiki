const connection = require('../../config/connection');

exports.getSpecificCohort = (id) =>
  connection.query('select * from cohort where id = $1', [id]);
