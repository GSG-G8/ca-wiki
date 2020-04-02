const {
  postCohort,
  deleteCohortQuery,
  getCohortQuery,
  getCohorts,
  putSpecificCohort,
} = require('./cohort');
const { addProjectQuery, editProjectQuery } = require('./project');
const { deleteStudentQuery } = require('./student');

module.exports = {
  postCohort,
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
  editProjectQuery,
  deleteStudentQuery,
};
