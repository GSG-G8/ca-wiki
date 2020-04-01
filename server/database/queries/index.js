const { getProjects, addProjectQuery } = require('./project');
const { getCohorts, getCohortQuery, deleteCohortQuery } = require('./cohort');

module.exports = {
  getProjects,
  getCohorts,
  deleteCohortQuery,
  getCohortQuery,
  addProjectQuery,
};
