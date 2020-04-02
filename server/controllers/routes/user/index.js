const router = require('express').Router();

const { getCohortsData } = require('./cohort');
const { getSpecificCohort } = require('./cohort');

router.get('/cohorts', getCohortsData);
router.get('/cohorts/:cohortid', getSpecificCohort);

module.exports = router;
