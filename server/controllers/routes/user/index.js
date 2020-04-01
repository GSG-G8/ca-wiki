const router = require('express').Router();
const { getProjectsData } = require('./project');
const { getCohortsData } = require('./cohort');

router.get('/projects', getProjectsData);
router.get('/cohorts', getCohortsData);

module.exports = router;
