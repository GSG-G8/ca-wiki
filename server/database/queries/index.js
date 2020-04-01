const { getCohorts } = require('./cohort');
const { getCohortQuery } = require('./cohort');
const { deleteCohortQuery } = require('./cohort');
const { getCohortProjectsQuery } = require('./project');
const { addProjectQuery, editProjectQuery } = require('./project');

module.exports = {
  getCohorts,
  deleteCohortQuery,
  getCohortQuery,
  addProjectQuery,
  getCohortProjectsQuery,
  editProjectQuery,
};
