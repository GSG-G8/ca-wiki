const { getCohortQuery } = require('./cohort');
const { deleteCohortQuery } = require('./cohort');
const { addProjectQuery } = require('./project');
const { getAlumniQuery } = require('./student');

module.exports = {
  deleteCohortQuery,
  getCohortQuery,
  addProjectQuery,
  getAlumniQuery,
};
