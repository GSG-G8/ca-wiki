const admin = require('express').Router();
const { deleteProjectData } = require('./project');

admin.delete('/projects/:projectId', deleteProjectData);

module.exports = admin;
