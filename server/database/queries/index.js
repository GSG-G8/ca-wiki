const { getCohortQuery } = require('./cohort');
const { deleteCohortQuery } = require('./cohort');
const { addProjectQuery, editProjectQuery } = require('./project');

module.exports = {
  deleteCohortQuery,
  getCohortQuery,
  addProjectQuery,
  editProjectQuery,
};
