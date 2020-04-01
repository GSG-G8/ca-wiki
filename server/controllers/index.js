const router = require('express').Router();

const admin = require('./routes/admin');
const { getSpecificCohort } = require('./routes/user');

router.get('/cohorts/:cohortid', getSpecificCohort);
router.use(admin);

module.exports = router;
