const router = require('express').Router();

const { getCohortsData, getSpecificCohort } = require('./cohort');
const { getProjectData } = require('./project');

router.get('/cohorts', getCohortsData);
router.get('/cohorts/:cohortid', getSpecificCohort);
router.get('/projects/:id', getProjectData);

module.exports = router;
