const router = require('express').Router();
const admin = require('./admin');
const cohorts = require('./cohorts');
const projects = require('./projects');
const alumni = require('./alumni');

router.use(cohorts);
router.use(projects);
router.use(alumni);
router.use(admin);
module.exports = router;
