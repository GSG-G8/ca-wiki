const router = require('express').Router();
const { getProjectsData } = require('./project');

router.get('/projects', getProjectsData);

module.exports = router;
