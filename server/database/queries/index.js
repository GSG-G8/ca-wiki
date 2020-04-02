const {
  putSpecificCohort,
  getCohorts,
  getCohortQuery,
  deleteCohortQuery,
} = require('./cohort');
const {
  addProjectQuery,
  editProjectQuery,
  getProjectById,
} = require('./project');
const { deleteStudentQuery } = require('./student');

module.exports = {
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
  editProjectQuery,
  deleteStudentQuery,
  getProjectById,
};
