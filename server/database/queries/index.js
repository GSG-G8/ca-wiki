const {
  postCohort,
  deleteCohortQuery,
  getCohortQuery,
  getCohorts,
} = require('./cohort');
const { addProjectQuery } = require('./project');

module.exports = {
  postCohort,
  getCohorts,
  deleteCohortQuery,
  getCohortQuery,
  addProjectQuery,
};
