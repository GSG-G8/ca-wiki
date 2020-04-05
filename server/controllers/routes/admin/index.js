const router = require('express').Router();

const { deleteStudent, putStudentData, addStudentData } = require('./student');
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
router.get('/cohorts/:cohortId/projects', getCohortProjects);

router.use(protectedRoute);

router.route('/cohorts/:cohortId').put(editCohort).delete(deleteCohort);
router.post('/cohorts', addCohort);
router.put('/projects/:projectId', editProject);
router.post('/projects', addProject);
router.delete('/alumni/:studentId', deleteStudent);
router.put('/alumni/:studentId', putStudentData);
router.delete('/projects/:projectId', deleteProjectData);
router.post('/alumni', addStudentData);
router.get('/stats', getStats);

module.exports = router;
