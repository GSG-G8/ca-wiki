const connection = require('../../connection');

const getAlumniQuery = () => connection.query('SELECT * FROM student');

module.exports = getAlumniQuery;
