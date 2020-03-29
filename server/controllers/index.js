const router = require('express').Router();
const {
  cohort: { getSpecificCohort },
} = require('./routes/user');

router.get('/cohort/:cohortid', getSpecificCohort);

module.exports = router;
