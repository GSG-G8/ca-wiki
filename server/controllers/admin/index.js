const addCohort = require('./addCohort');
const addProject = require('./addProject');
const addStudentData = require('./addStudentData');
const deleteCohort = require('./deleteCohort');
const deleteProjectData = require('./deleteProjectData');
const deleteStudent = require('./deleteStudent');
const editCohort = require('./editCohort');
const editProject = require('./editProject');
const getCohortProjects = require('../getCohortProjects');
const login = require('./login');
const logout = require('./logout');
const putStudentData = require('./putStudentData');
const getStats = require('./stats');
const AssignProjectStudent = require('./AssignProjectStudent');
const deleteAssignProjectStudent = require('./deleteAssignProjectStudent');
const getSecret = require('./getSecret');

module.exports = {
  addCohort,
  addProject,
  addStudentData,
  deleteCohort,
  deleteProjectData,
  deleteStudent,
  editCohort,
  editProject,
  getCohortProjects,
  login,
  logout,
  putStudentData,
  getStats,
  AssignProjectStudent,
  deleteAssignProjectStudent,
  getSecret,
};
