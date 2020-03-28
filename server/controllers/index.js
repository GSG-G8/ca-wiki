const router = require('express').Router();
const {
  cohort: { getSpecificCohort },
} = require('./routes/user');

router.get('/', (req, res) => {
  res.send('<h1>CA WIKI</h1>');
});

router.get('/cohort/:cohortid', getSpecificCohort);

module.exports = router;
