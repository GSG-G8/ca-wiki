const router = require('express').Router();
const cohorts = require('./cohorts');
const projects = require('./projects');

router.use(projects);
router.use(cohorts);

module.exports = router;
