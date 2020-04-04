const connection = require('../../config/connection');

const getSpecificAlumni = (id) =>
  connection.query('select * from student where cohort_id = $1', [id]);

module.exports = getSpecificAlumni;
