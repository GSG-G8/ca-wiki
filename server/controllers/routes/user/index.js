const router = require('express').Router();

const { getAlumni } = require('./student');
const { getCohortsData, getSpecificCohort } = require('./cohort');
const { getProjectData } = require('./project');

router.get('/alumni', getAlumni);
router.get('/cohorts/:cohortId', getSpecificCohort);
router.get('/cohorts', getCohortsData);
router.get('/projects/:projectId', getProjectData);

module.exports = router;
