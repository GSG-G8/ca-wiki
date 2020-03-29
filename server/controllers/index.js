const router = require('express').Router();

const { client, server } = require('./middlewares/errorHandle');

router.all('*', client);
router.use(server);

module.exports = router;
