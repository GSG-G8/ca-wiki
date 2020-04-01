const router = require('express').Router();
const admin = require('./routes/admin');

const { serverError } = require('./middlewares/errorHandle');

router.use(serverError);

router.use(admin);

module.exports = router;
