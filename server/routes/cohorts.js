const router = require('express').Router();

const {
  getCohortsData,
  getSpecificCohort,
  editCohort,
  deleteCohort,
} = require('../controllers');

router.get('/cohorts', getCohortsData);

router
  .route('/cohorts/:cohortId')
  .get(getSpecificCohort)
  .put(editCohort)
  .delete(deleteCohort);

module.exports = router;
