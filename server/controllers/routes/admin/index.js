const router = require('express').Router();
const { deleteCohort } = require('./cohort');
const { addProject, projectEdit } = require('./project');
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
  .delete(deleteCohort);

router.put('/projects/:projectId', validateEditProject, projectEdit);
router.post('/projects', addProject);

module.exports = router;
