const connection = require('../../connection');

const deleteCohortQuery = (cohortId) =>
  connection.query('DELETE FROM cohort WHERE id = $1', [cohortId]);

module.exports = deleteCohortQuery;
