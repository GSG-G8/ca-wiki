const connection = require('../../config/connection');

const getCohortProjectsQuery = (cohortId, projectType) =>
  connection.query(
    'SELECT * FROM project WHERE cohort_id = $1 AND project_type ilike $2',
    [cohortId, projectType],
  );

module.exports = getCohortProjectsQuery;
