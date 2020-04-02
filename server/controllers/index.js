const router = require('express').Router();

const admin = require('./routes/admin');

router.use(admin);

module.exports = router;
