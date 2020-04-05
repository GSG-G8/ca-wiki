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

router.post('/cohorts', addCohort);

router.route('/cohorts/:cohortId').put(editCohort).delete(deleteCohort);

router.put('/projects/:projectId', editProject);
router.post('/projects', addProject);
router.get('/cohorts/:cohortId/projects', getCohortProjects);
router.delete('/alumni/:studentId', deleteStudent);
router.put('/alumni/:studentId', putStudentData);
router.delete('/projects/:projectId', deleteProjectData);
router.get('/stats', getStats);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
