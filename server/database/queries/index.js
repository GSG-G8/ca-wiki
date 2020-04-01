const { putSpecificCohort } = require('./cohort');
const { getCohortQuery } = require('./cohort');
const { deleteCohortQuery } = require('./cohort');
const { addProjectQuery } = require('./project');

module.exports = {
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
};
