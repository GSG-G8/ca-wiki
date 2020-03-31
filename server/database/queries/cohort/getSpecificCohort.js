const connection = require('../../config/connection');

exports.getCohortQuery = (id) =>
  connection.query('select * from cohort where id = $1', [id]);
