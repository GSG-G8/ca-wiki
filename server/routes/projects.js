const router = require('express').Router();

const { addProject, editProject } = require('../controllers/admin');

router.put('/projects/:projectId', editProject);
router.post('/projects', addProject);

module.exports = router;
