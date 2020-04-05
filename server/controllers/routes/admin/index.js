const router = require('express').Router();

const { deleteStudent, putStudentData } = require('./student');
const { addCohort, deleteCohort, editCohort } = require('./cohort');
const {
  addProject,
  editProject,
  deleteProjectData,
  getCohortProjects,
} = require('./project');
const getStats = require('./stats');
const login = require('./login');
const logout = require('./logout');
const protectedRoute = require('../../middlewares/auth');

router.post('/login', login);
router.get('/logout', logout);

router
  .route('/cohorts/:cohortId')
  .put(protectedRoute, editCohort)
  .delete(protectedRoute, deleteCohort);
router.post('/cohorts', protectedRoute, addCohort);
router.put('/projects/:projectId', protectedRoute, editProject);
router.post('/projects', protectedRoute, addProject);
router.get('/cohorts/:cohortId/projects', getCohortProjects);
router.delete('/alumni/:studentId', protectedRoute, deleteStudent);
router.put('/alumni/:studentId', protectedRoute, putStudentData);
router.delete('/projects/:projectId', protectedRoute, deleteProjectData);
router.get('/stats', getStats);

module.exports = router;
