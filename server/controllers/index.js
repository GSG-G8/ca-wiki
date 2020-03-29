const router = require('express').Router();
const admin = require('./routes/admin');

router.get('/', (req, res) => {
  res.send('<h1>CA WIKI</h1>');
});

router.use(admin);

module.exports = router;
