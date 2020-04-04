const connection = require('../../config/connection');

const getAlumniQuery = () => connection.query('SELECT * FROM student');

module.exports = getAlumniQuery;
