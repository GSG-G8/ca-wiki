const router = require('express').Router();
const userRouter = require('./routes/user');

router.use(userRouter);

const admin = require('./routes/admin');
const { getSpecificCohort } = require('./routes/user');

router.get('/cohorts/:cohortid', getSpecificCohort);
router.use(admin);

module.exports = router;
