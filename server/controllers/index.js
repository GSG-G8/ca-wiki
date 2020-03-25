const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('<h1>CA WIKI</h1>');
});

module.exports = router;
