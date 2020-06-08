const router = require('express').Router();

const {
  getAlumni,
  getStudentById,
  getStudentProjects,
} = require('../controllers');

router.get('/alumni', getAlumni);
router.get('/alumni/:studentId', getStudentById);
router.get('/alumni/:studentId/projects', getStudentProjects);

module.exports = router;
