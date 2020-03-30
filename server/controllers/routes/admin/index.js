const router = require('express').Router();
const { cohortDelete } = require('./cohort');
const { projectAdd, projectEdit } = require('./project');
const { validateAddProject } = require('../../../validation');
const { validateEditProject } = require('../../../validation');

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
  .delete(cohortDelete);

router.put('/projects/:projectId', validateEditProject, projectEdit);
router.post('/projects', validateAddProject, projectAdd);

module.exports = router;
