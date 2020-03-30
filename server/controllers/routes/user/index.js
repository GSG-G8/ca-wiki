const userRouter = require('express').Router();

const { getCohortsData } = require('./cohort');

userRouter.get('/cohorts', getCohortsData);

module.exports = userRouter;
