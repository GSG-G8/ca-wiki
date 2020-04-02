const router = require('express').Router();
const user = require('../controllers/routes/user');
const admin = require('../controllers/routes/admin');

router.use(user);
router.use(admin);

module.exports = router;
