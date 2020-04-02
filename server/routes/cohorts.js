const router = require('express').Router();

const { editCohort, deleteCohort } = require('../controllers/admin');

const { getSpecificCohort } = require('../controllers');

const { getCohortsData } = require('../controllers');

router.get('/cohorts', getCohortsData);

router
  .route('/cohorts/:cohortId')
  .all((req, res, next) => {
    // ToDo: make middleware to check authentication
    next();
  })
  .get(getSpecificCohort)
  .put(editCohort)
  .post((req, res, next) => {
    next(new Error('not implemented'));
  })
  .delete(deleteCohort);

module.exports = router;
