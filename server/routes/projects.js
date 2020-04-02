const router = require('express').Router();

const {
  addProject,
  editProject,
} = require('../controllers/routes/admin/project');

router.put('/projects/:projectId', editProject);
router.post('/projects', addProject);

module.exports = router;
