const router = require('express').Router();

const { getAlumni, getStudentById } = require('../controllers');

router.get('/alumni', getAlumni);
router.get('/alumni/:studentId', getStudentById);

module.exports = router;
