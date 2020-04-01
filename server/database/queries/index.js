const { getCohorts } = require('./cohort');
const { getCohortQuery } = require('./cohort');
const { deleteCohortQuery } = require('./cohort');
const { addProjectQuery } = require('./project');
const { getCohortProjectsQuery } = require('./project');

module.exports = {
  getCohorts,
  deleteCohortQuery,
  getCohortQuery,
  addProjectQuery,
  getCohortProjectsQuery,
};
