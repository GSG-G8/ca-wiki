const router = require('express').Router();
const userRouter = require('./routes/user');

router.use(userRouter);
const admin = require('./routes/admin');

const { clientError, serverError } = require('./middlewares/errorHandle');

router.use(clientError);
router.use(serverError);

router.use(admin);

module.exports = router;
