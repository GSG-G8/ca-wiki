const connection = require('../../config/connection');

exports.getProjects = () => connection.query('SELECT * FROM project');
