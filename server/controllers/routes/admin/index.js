const router = require('express').Router();

const { deleteStudent, putStudentData } = require('./student');
const { addCohort, deleteCohort, editCohort } = require('./cohort');
const {
  addProject,
  editProject,
  deleteProjectData,
  getCohortProjects,
} = require('./project');

router.post('/cohorts', addCohort);

router.route('/cohorts/:cohortId').put(editCohort).delete(deleteCohort);

router.put('/projects/:projectId', editProject);
router.post('/projects', addProject);
router.get('/cohorts/:cohortId/projects', getCohortProjects);
router.delete('/alumni/:studentId', deleteStudent);
router.put('/alumni/:studentId', putStudentData);
router.delete('/projects/:projectId', deleteProjectData);

module.exports = router;
