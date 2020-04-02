const router = require('express').Router();
const cohorts = require('./cohorts');
const projects = require('./projects');
// const alumni = require('./alumni');

router.use(cohorts);
router.use(projects);
// router.use(alumni);
module.exports = router;
