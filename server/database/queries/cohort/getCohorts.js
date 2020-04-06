const connection = require('../../connection');

const getCohorts = () => connection.query('SELECT * FROM cohort');

module.exports = getCohorts;
