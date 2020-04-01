const router = require('express').Router();
const { clientError, serverError } = require('./middlewares/errorHandle');
const { editCohort } = require('./routes/admin');

router.put('/cohorts/:cohortId', editCohort);

router.use(clientError);
router.use(serverError);

module.exports = router;
