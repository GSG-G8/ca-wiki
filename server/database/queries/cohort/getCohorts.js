const connection = require('../../config/connection');

exports.getCohorts = () => connection.query('SELECT * FROM cohort');
