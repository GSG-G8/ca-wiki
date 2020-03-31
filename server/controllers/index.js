const router = require('express').Router();
const {
  cohort: { getSpecificCohort },
} = require('./routes/user');

router.get('/cohorts/:cohortid', getSpecificCohort);

module.exports = router;
