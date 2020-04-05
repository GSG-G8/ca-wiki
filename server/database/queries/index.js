const {
  deleteStudentQuery,
  putStudent,
  getAlumniQuery,
  addStudent,
  getStudentByIdQuery,
  getSpecificAlumni,
} = require('./student');

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
const getStatsQuery = require('./getStatsQuery');

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
  addStudent,
  getSpecificAlumni,
  getProjects,
  getStudentByIdQuery,
  getStatsQuery,
};
