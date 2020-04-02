const router = require('express').Router();
const { getProjectsData } = require('./project');
const { getCohortsData, getSpecificCohort } = require('./cohort');

router.get('/projects?type=', getProjectsData);
router.get('/cohorts', getCohortsData);
router.get('/cohorts/:cohortid', getSpecificCohort);

module.exports = router;
