const { getStatsQuery } = require('../../database/queries');

const getStats = async (req, res, next) => {
  try {
    const { rows } = await getStatsQuery();
    res.json({
      StatusCode: 200,
      data: {
        cohortsCount: rows[0].count,
        projectsCount: rows[1].count,
        studentsCount: rows[2].count,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getStats;
