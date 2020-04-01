const userRouter = require('express').Router();

const { getCohortsData, getSpecificCohort } = require('./cohort');

userRouter.get('/cohorts', getCohortsData);
userRouter.get('/cohorts/:cohortId', getSpecificCohort);

module.exports = userRouter;
