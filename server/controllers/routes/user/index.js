const router = require('express').Router();

const { getCohortsData } = require('./cohort');
const { getSpecificCohort } = require('./cohort');
const { getAlumni } = require('./student');

router.get('/cohorts/:cohortId', getSpecificCohort);
router.get('/cohorts', getCohortsData);
router.get('/alumni', getAlumni);

module.exports = router;
