const router = require('express').Router();
const { editCohort } = require('./routes/admin');

router.put('/cohorts/:cohortId', editCohort);

module.exports = router;
