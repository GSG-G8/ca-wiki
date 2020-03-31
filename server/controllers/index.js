const router = require('express').Router();
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

router.use(userRouter);
router.use(adminRouter);

module.exports = router;
