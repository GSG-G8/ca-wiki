const editCohort = require('./admin/editCohort');
const deleteCohort = require('./admin/deleteCohort');
const addProject = require('./admin/addProject');
const editProject = require('./admin/editProject');
const getCohortsData = require('./getCohortsData');
const getSpecificCohort = require('./getSpecificCohort');
const { clientError } = require('./errorHandle/error');
const { serverError } = require('./errorHandle/error');

module.exports = {
  editCohort,
  deleteCohort,
  addProject,
  editProject,
  getCohortsData,
  getSpecificCohort,
  clientError,
  serverError,
};
