const router = require('express').Router();
const { editCohort } = require('./routes/admin');
const { validateEditCohort } = require('../validation/index');

router.put('/cohorts/:cohortid', validateEditCohort, editCohort);

module.exports = router;
