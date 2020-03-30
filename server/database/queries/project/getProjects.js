const connection = require('../../config/connection');

exports.getCohort = () => connection.query('SELECT * FROM project');
