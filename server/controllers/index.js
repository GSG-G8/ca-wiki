const router = require('express').Router();

const { clientError, serverError } = require('./middlewares/errorHandle');
const admin = require('./routes/admin');

router.use(admin);

router.use(clientError);
router.use(serverError);

module.exports = router;
