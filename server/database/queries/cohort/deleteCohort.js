const connection = require('../../config/connection');

const deleteCohort = (cohortId) =>
  connection.query('DELETE FROM cohort WHERE id = $1', [cohortId]);

module.exports = deleteCohort;
