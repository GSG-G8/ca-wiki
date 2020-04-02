const {
  putSpecificCohort,
  getCohorts,
  getCohortQuery,
  deleteCohortQuery,
} = require('./cohort');
const {
  addProjectQuery,
  editProjectQuery,
  deleteProject,
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
  deleteProject,
};
