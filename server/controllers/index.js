const getCohortsData = require('./getCohortsData');
const getSpecificCohort = require('./getSpecificCohort');
const getProjectsData = require('./getProjectsByType');
const getProjectData = require('./getProjectById');
const getStudentProject = require('./getStudentProject');
const getAlumniCohort = require('./getAlumniCohort');
const getAlumni = require('./getAlumni');
const getStudentById = require('./getStudentById');
const getCohortProjects = require('./getCohortProjects');
const {
  addCohort,
  addProject,
  addStudentData,
  deleteCohort,
  deleteProjectData,
  deleteStudent,
  editCohort,
  editProject,
  login,
  logout,
  putStudentData,
  getStats,
} = require('./admin');

module.exports = {
  getCohortsData,
  getSpecificCohort,
  getProjectsData,
  getProjectData,
  getStudentProject,
  getAlumniCohort,
  getAlumni,
  getStudentById,
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
};
