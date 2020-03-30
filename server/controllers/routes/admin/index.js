const router = require('express').Router();
const { addCohort } = require('./cohort');

router.route('/cohorts').post(addCohort);

module.exports = router;
