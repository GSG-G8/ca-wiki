const router = require('express').Router();

const { getCohortsData } = require('./cohort');
const { getSpecificCohort } = require('./cohort');

router.get('/cohorts/:cohortId', getSpecificCohort);
router.get('/cohorts', getCohortsData);

module.exports = router;
