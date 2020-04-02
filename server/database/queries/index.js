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
  getCohortProjectsQuery,
} = require('./project');
const { deleteStudentQuery } = require('./student');

module.exports = {
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
  getCohortProjectsQuery,
  editProjectQuery,
  deleteStudentQuery,
  deleteProject,
};
