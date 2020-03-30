const router = require('express').Router();
const {
  cohort: { putSpecificCohort },
} = require('./routes/admin');

router.put('/cohort/:cohortid', putSpecificCohort);

module.exports = router;
