const router = require('express').Router();
const { cohortDelete } = require('./cohort');
const { cohortAdd, validateAddProject } = require('./project');

router
  .route('/cohorts/:cohortId')
  .all((req, res, next) => {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get((req, res, next) => {
    next(new Error('not implemented'));
  })
  .put((req, res, next) => {
    next(new Error('not implemented'));
  })
  .post((req, res, next) => {
    next(new Error('not implemented'));
  })
  .delete(cohortDelete);

router.post('/projects', validateAddProject, cohortAdd);

module.exports = router;
