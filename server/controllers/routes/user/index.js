const router = require('express').Router();

const { getAlumni, getStudentById } = require('./student');
const {
  getProjectData,
  getProjectsData,
  getStudentProject,
} = require('./project');
const { getCohortsData, getSpecificCohort } = require('./cohort');
const { getAlumniCohort } = require('./student');

router.get('/cohorts/:cohortId/alumni', getAlumniCohort);
router.get('/alumni', getAlumni);
router.get('/alumni/:studentId', getStudentById);
router.get('/projects', getProjectsData);
router.get('/cohorts', getCohortsData);
router.get('/cohorts/:cohortId', getSpecificCohort);
router.get('/projects/:projectId', getProjectData);
router.get('/alumni/projects/:projectId', getStudentProject);

module.exports = router;
