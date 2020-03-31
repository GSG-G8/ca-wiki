const router = require('express').Router();
const userRouter = require('./routes/user');

router.use(userRouter);

module.exports = router;
