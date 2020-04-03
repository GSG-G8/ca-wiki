const connection = require('../../config/connection');

const getAllProjects = () => connection.query('SELECT * FROM project');

module.exports = getAllProjects;
