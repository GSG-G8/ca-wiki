const { getCohorts, getCohortQuery, deleteCohortQuery } = require('./cohort');
const {
  addProjectQuery,
  editProjectQuery,
  getCohortProjectsQuery,
} = require('./project');

module.exports = {
  getCohorts,
  deleteCohortQuery,
  getCohortQuery,
  addProjectQuery,
  getCohortProjectsQuery,
  editProjectQuery,
};
