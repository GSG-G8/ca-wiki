const getAlumniQuery = require('./getAlumni');
const deleteStudentQuery = require('./deleteStudentQuery');
const getSpecificAlumni = require('./getSpecificAlumni');
const putStudent = require('./putStudent');
const addStudent = require('./addStudent');
const getStudentByIdQuery = require('./getStudentByIdQuery');
const getStudentProjectsQuery = require('./getStudentProjects');
const AssignProjectStudentQuery = require('./AssignProjectStudentQuery');

module.exports = {
  getAlumniQuery,
  deleteStudentQuery,
  addStudent,
  getSpecificAlumni,
  putStudent,
  getStudentByIdQuery,
  getStudentProjectsQuery,
  AssignProjectStudentQuery,
};
