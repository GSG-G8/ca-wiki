const { deleteStudentQuery, putStudent } = require('./student');
const {
  postCohort,
  deleteCohortQuery,
  getCohortQuery,
  getCohorts,
  putSpecificCohort,
} = require('./cohort');
const {
  addProjectQuery,
  editProjectQuery,
  getCohortProjectsQuery,
} = require('./project');

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
  putStudent,
};
