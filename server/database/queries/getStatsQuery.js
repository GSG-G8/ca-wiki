const connection = require('../config/connection');

const getStatsQuery = () =>
  connection.query(
    'SELECT COUNT(id) FROM cohort UNION ALL SELECT COUNT(id) FROM project UNION ALL SELECT COUNT(id) FROM student',
  );

module.exports = getStatsQuery;
