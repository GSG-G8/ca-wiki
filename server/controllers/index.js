const router = require('express').Router();

const user = require('./routes/user');
const admin = require('./routes/admin');

router.use(user);
router.use(admin);

module.exports = router;
