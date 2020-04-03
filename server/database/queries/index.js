const { getAlumniQuery, deleteStudentQuery, putStudent } = require('./student');

const {
  putSpecificCohort,
  getCohorts,
  getCohortQuery,
  deleteCohortQuery,
  postCohort,
} = require('./cohort');
const {
  addProjectQuery,
  editProjectQuery,
  getProjectById,
  deleteProject,
  getCohortProjectsQuery,
} = require('./project');

module.exports = {
  postCohort,
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
  getAlumniQuery,
  getCohortProjectsQuery,
  editProjectQuery,
  deleteStudentQuery,
  putStudent,
  getProjectById,
  deleteProject,
};
