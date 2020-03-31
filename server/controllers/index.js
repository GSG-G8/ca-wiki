const router = require('express').Router();
const {
  cohort: { putSpecificCohort },
} = require('./routes/admin');
const { validateEditCohort } = require('../validation/index');

router.put('/cohort/:cohortid', validateEditCohort, putSpecificCohort);

module.exports = router;
