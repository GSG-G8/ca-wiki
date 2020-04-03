const { getCohorts } = require('../../../database/queries');
const { getAlumniQuery } = require('../../../database/queries');
const { getAllProjects } = require('../../../database/queries');

const getStats = async (req, res, next) => {
  try {
    const cohorts = await getCohorts();
    const cohortsCount = cohorts.rowCount;
    const projects = await getAllProjects();
    const projectsCount = projects.rowCount;
    const students = await getAlumniQuery();
    const studentsCount = students.rowCount;

    res.json({
      StatusCode: 200,
      data: [
        { numOfCohorts: cohortsCount },
        { numOfProjects: projectsCount },
        { numOfStudents: studentsCount },
      ],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getStats;
