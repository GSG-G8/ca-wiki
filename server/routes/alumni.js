const router = require('express').Router();
const { deleteStudent } = require('../controllers');

router.delete('/alumni/:studentId', deleteStudent);

module.exports = router;
