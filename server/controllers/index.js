const router = require('express').Router();
const user = require('./routes/user');
const admin = require('./routes/admin');
const { getSpecificCohort } = require('./routes/user/cohort');

router.use(user);
router.get('/cohorts/:cohortid', getSpecificCohort);
router.use(admin);

module.exports = router;
