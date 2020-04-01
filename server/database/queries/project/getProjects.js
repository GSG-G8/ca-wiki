const connection = require('../../config/connection');

const getProjects = () => connection.query('SELECT * FROM project');

module.exports = getProjects;
