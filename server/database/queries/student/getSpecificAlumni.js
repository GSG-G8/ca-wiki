const connection = require('../../config/connection');

const getSpecificAlumni = (id) =>
  connection.query('SELECT * FROM student WHERE cohort_id = $1', [id]);

module.exports = getSpecificAlumni;
