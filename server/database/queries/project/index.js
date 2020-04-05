const getProjects = require('./getProjectsByType');
const addProjectQuery = require('./addProject');
const getCohortProjectsQuery = require('./getCohortProjects');
const editProjectQuery = require('./editProject');
const getProjectById = require('./getProjectById');
const deleteProject = require('./deleteProject');
const studentProjectQuery = require('./studentProjectQuery');

module.exports = {
  getProjects,
  addProjectQuery,
  getCohortProjectsQuery,
  editProjectQuery,
  getProjectById,
  deleteProject,
  studentProjectQuery,
};
