const router = require('express').Router();
const { deleteCohort } = require('./cohort');
const { addProject } = require('./project');
const { getCohortProjects } = require('./project');

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

router.post('/projects', addProject);
router.get('/cohorts/:cohortId/projects', getCohortProjects);

module.exports = router;
