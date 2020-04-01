const { getCohortQuery } = require('./cohort');
const { deleteCohortQuery } = require('./cohort');
const { addProjectQuery } = require('./project');

module.exports = {
  deleteCohortQuery,
  getCohortQuery,
  addProjectQuery,
};
