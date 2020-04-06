const router = require('express').Router();

const {
  getProjectsData,
  getProjectData,
  getStudentProject,
} = require('../controllers');

router.get('/projects', getProjectsData);
router.get('/projects/:projectId', getProjectData);
router.get('/projects/:projectId/alumni', getStudentProject);

module.exports = router;
