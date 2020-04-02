const { putSpecificCohort } = require('./cohort');
const { getCohorts } = require('./cohort');
const { getCohortQuery } = require('./cohort');
const { deleteCohortQuery } = require('./cohort');
const { addProjectQuery, editProjectQuery } = require('./project');
const { deleteStudentQuery } = require('./student');

module.exports = {
  getCohorts,
  deleteCohortQuery,
  putSpecificCohort,
  getCohortQuery,
  addProjectQuery,
  editProjectQuery,
  deleteStudentQuery,
};
