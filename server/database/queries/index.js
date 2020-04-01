const {
  postCohort,
  deleteCohortQuery,
  getCohortQuery,
  getCohorts,
} = require('./cohort');
const { addProjectQuery, editProjectQuery } = require('./project');

module.exports = {
  postCohort,
  getCohorts,
  deleteCohortQuery,
  getCohortQuery,
  addProjectQuery,
  editProjectQuery,
};
