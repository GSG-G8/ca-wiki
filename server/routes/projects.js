const router = require('express').Router();

const { addProject, editProject } = require('../controllers');

router.post('/projects', addProject);

router.route('/projects/:projectId').put(editProject);

module.exports = router;
