const router = require('express').Router();

const { getCohortsData } = require('./cohort');

router.get('/cohorts', getCohortsData);

module.exports = router;
