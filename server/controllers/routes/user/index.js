const router = require('express').Router();

const { getCohortsData, getSpecificCohort } = require('./cohort');
const { getAlumniCohort } = require('./student');

router.get('/cohorts/:cohortId', getSpecificCohort);
router.get('/cohorts', getCohortsData);
router.get('/cohorts/:cohortid', getSpecificCohort);
router.get('/alumni/:cohortId', getAlumniCohort);

module.exports = router;
