const connection = require('../../connection');

const getSpecificAlumni = (id) =>
  connection.query('SELECT * FROM student WHERE cohort_id = $1 ORDER BY name', [
    id,
  ]);

module.exports = getSpecificAlumni;
