const router = require('express').Router();

const admin = require('./routes/admin');
const { getSpecificCohort } = require('./routes/user');
const { getAlumni } = require('./routes/user');

router.get('/alumni', getAlumni);
router.get('/cohorts/:cohortid', getSpecificCohort);
router.use(admin);

module.exports = router;
