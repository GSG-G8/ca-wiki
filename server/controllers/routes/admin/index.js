const router = require('express').Router();
const { deleteCohort } = require('./cohort');
const { addProject } = require('./project');
const { validateAddProject } = require('../../../validation');

router
  .route('/cohorts/:cohortId')
  .all((req, res, next) => {
    // ToDo: make middleware to check authentication
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
  .delete(deleteCohort);

router.post('/projects', validateAddProject, addProject);

module.exports = router;
