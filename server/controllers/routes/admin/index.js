const router = require('express').Router();

const { editCohort } = require('./cohort');
const { deleteCohort } = require('./cohort');

router
  .route('/cohorts/:cohortId')
  .all((req, res, next) => {
    // ToDo: make middleware to check authentication
    next();
  })
  .get((req, res, next) => {
    next(new Error('not implemented'));
  })
  .put(editCohort)
  .post((req, res, next) => {
    next(new Error('not implemented'));
  })
  .delete(deleteCohort);

module.exports = router;
