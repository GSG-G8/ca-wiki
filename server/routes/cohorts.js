const router = require('express').Router();

const { editCohort, deleteCohort } = require('../controllers');

const { getSpecificCohort } = require('../controllers');

const { getCohortsData } = require('../controllers');

router.get('/cohorts', getCohortsData);

router
  .route('/cohorts/:cohortId')
  .get(getSpecificCohort)
  .put(editCohort)
  .delete(deleteCohort);

module.exports = router;
