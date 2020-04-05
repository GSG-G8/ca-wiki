const getAlumniQuery = require('./getAlumni');
const deleteStudentQuery = require('./deleteStudentQuery');
const getSpecificAlumni = require('./getSpecificAlumni');
const putStudent = require('./putStudent');
const addStudent = require('./addStudent');
const getStudentByIdQuery = require('./getStudentByIdQuery');

module.exports = {
  getAlumniQuery,
  deleteStudentQuery,
  addStudent,
  getSpecificAlumni,
  putStudent,
  getStudentByIdQuery,
};
