const router = require('express').Router();

const { getAlumni } = require('./student');
const { getProjectData, getProjectsData } = require('./project');
const { getCohortsData, getSpecificCohort } = require('./cohort');


router.get('/alumni', getAlumni);
router.get('/projects', getProjectsData);
router.get('/cohorts', getCohortsData);
router.get('/cohorts/:cohortId', getSpecificCohort);
router.get('/projects/:projectId', getProjectData);

module.exports = router;
