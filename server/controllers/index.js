const Router = require('express').Router();
const userRouter = require('./routes/user');

Router.use(userRouter);

module.exports = Router;
