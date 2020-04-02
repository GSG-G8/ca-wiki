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
};
