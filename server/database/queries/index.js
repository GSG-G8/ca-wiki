const { putSpecificCohort } = require('./cohort');
const { getCohorts } = require('./cohort');
const { getCohortQuery } = require('./cohort');
const { deleteCohortQuery } = require('./cohort');
const { addProjectQuery } = require('./project');

module.exports = {
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
};
