const postCohort = require('./postCohort');
const getCohorts = require('./getCohorts');
const getCohortQuery = require('./getSpecificCohort');
const deleteCohortQuery = require('./deleteCohort');

module.exports = {
  postCohort,
  getCohorts,
  deleteCohortQuery,
  getCohortQuery,
};
