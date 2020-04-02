const router = require('express').Router();

const { getCohortsData, getSpecificCohort } = require('./cohort');

router.get('/cohorts', getCohortsData);
router.get('/cohorts/:cohortid', getSpecificCohort);

module.exports = router;
