const { getStatsQuery } = require('../../../database/queries');

const getStats = async (req, res, next) => {
  try {
    const { rows } = await getStatsQuery();
    if (rows.length > 0) {
      res.json({
        StatusCode: 200,
        data: {
          cohortsCount: rows[0].count,
          projectsCount: rows[1].count,
          studentsCount: rows[2].count,
        },
      });
    } else {
      res.json({
        StatusCode: 200,
        message: 'No data',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getStats;
