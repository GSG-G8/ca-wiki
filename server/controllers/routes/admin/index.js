const adminRouter = require('express').Router();
const { deleteProjectData } = require('./project');

adminRouter.delete('/projects/:projectId', deleteProjectData);

module.exports = adminRouter;
