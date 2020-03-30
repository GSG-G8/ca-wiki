const connection = require('../../config/connection');

const getCohorts = () => connection.query('SELECT * FROM cohort');

module.exports = { getCohorts };
