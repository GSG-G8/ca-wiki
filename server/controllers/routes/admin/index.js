const router = require('express').Router();
const { addCohort, deleteCohort, editCohort } = require('./cohort');
const { addProject, editProject } = require('./project');
const { deleteStudent } = require('./student');

router.post('/cohorts', addCohort);

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

router.put('/projects/:projectId', editProject);
router.post('/projects', addProject);
router.delete('/alumni/:studentId', deleteStudent);

module.exports = router;
