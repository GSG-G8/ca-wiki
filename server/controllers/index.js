const router = require('express').Router();
const { editCohort } = require('./routes/admin');

router.put('/cohorts/:cohortid', editCohort);

module.exports = router;
