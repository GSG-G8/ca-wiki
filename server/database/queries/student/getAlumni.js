const connection = require('../../connection');

const getAlumniQuery = () =>
  connection.query('SELECT * FROM student ORDER BY name');

module.exports = getAlumniQuery;
