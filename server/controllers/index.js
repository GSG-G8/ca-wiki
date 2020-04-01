const router = require('express').Router();

const { clientError, serverError } = require('./middlewares/errorHandle');
const admin = require('./routes/admin');
const { getSpecificCohort } = require('./routes/user');

router.get('/cohorts/:cohortid', getSpecificCohort);
router.use(admin);

router.use(clientError);
router.use(serverError);

module.exports = router;
