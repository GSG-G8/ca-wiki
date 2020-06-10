const connection = require('../../connection');

const getCohorts = () => connection.query('SELECT * FROM cohort ORDER BY id');

module.exports = getCohorts;
