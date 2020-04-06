const router = require('express').Router();

const {
  getCohortProjects,
  getAlumniCohort,
  getCohortsData,
  getSpecificCohort,
} = require('../controllers');

router.get('/cohorts/:cohortId/projects', getCohortProjects);
router.get('/cohorts/:cohortId/alumni', getAlumniCohort);
router.get('/cohorts', getCohortsData);
router.get('/cohorts/:cohortId', getSpecificCohort);

module.exports = router;
