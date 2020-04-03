const { getCohorts } = require('../../../database/queries');

const getStats = async (req, res, next) => {
  try {
    const cohorts = await getCohorts();
    const cohortsCount = cohorts.rowCount;
    const projectsCount = 16;
    const studentsCount = 45;
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
