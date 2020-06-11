const router = require('express').Router();
const protectedRoute = require('../controllers/auth');
const {
  deleteStudent,
  putStudentData,
  addStudentData,
  deleteCohort,
  editCohort,
  addCohort,
  deleteProjectData,
  editProject,
  addProject,
  logout,
  getStats,
  login,
  AssignProjectStudent,
  deleteAssignProjectStudent,
  getSecret,
} = require('../controllers');

router.post('/login', login);

router.use(protectedRoute);

router.get('/is-auth', (req, res) => {
  res.send({ statusCode: 200 });
});

router.route('/alumni/:studentId').put(putStudentData).delete(deleteStudent);
router.post('/alumni', addStudentData);
router.post('/alumni/projects/assign', AssignProjectStudent);
router.put('/alumni/projects/assign', deleteAssignProjectStudent);

router.route('/cohorts/:cohortId').put(editCohort).delete(deleteCohort);
router.post('/cohorts', addCohort);

router.route('/projects/:projectId').put(editProject).delete(deleteProjectData);
router.post('/projects', addProject);

router.get('/stats', getStats);
router.get('/secrets', getSecret);
router.get('/logout', logout);

module.exports = router;
