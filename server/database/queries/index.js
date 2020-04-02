const { getAlumniQuery, deleteStudentQuery } = require('./student');

const {
  getCohorts,
  getCohortQuery,
  deleteCohortQuery,
  putSpecificCohort,
} = require('./cohort');
const {
  addProjectQuery,
  editProjectQuery,
  getCohortProjectsQuery,
} = require('./project');

module.exports = {
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
  getAlumniQuery,
  getCohortProjectsQuery,
  editProjectQuery,
  deleteStudentQuery,
};
