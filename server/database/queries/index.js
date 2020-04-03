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
  getProjects,
} = require('./project');

const { deleteStudentQuery } = require('./student');

module.exports = {
  postCohort,
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
  getCohortProjectsQuery,
  editProjectQuery,
  deleteStudentQuery,
  getProjectById,
  deleteProject,
  getProjects,
};
