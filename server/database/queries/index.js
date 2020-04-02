const {
  putSpecificCohort,
  getCohorts,
  getCohortQuery,
  deleteCohortQuery,
} = require('./cohort');
const { addProjectQuery, editProjectQuery } = require('./project');
const { deleteStudentQuery, putStudent } = require('./student');

module.exports = {
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
  editProjectQuery,
  deleteStudentQuery,
  putStudent,
};
