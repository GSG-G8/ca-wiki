const router = require('express').Router();

const { getCohortsData, getSpecificCohort } = require('./cohort');
const { getAlumniCohort } = require('./student');
const { getProjectData } = require('./project');

router.get('/cohorts', getCohortsData);
router.get('/alumni/:cohortId', getAlumniCohort);

router.get('/cohorts/:cohortId', getSpecificCohort);

router.get('/projects/:projectId', getProjectData);

module.exports = router;
