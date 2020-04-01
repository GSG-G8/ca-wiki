const router = require('express').Router();
const user = require('./routes/user');
const admin = require('./routes/admin');
const { getSpecificCohort } = require('./routes/user/cohort');

router.get('/cohorts/:cohortId', getSpecificCohort);
router.use(user);
router.use(admin);

module.exports = router;
