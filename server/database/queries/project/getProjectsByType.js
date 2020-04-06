const connection = require('../../connection');

const getProjects = (ProjectType) =>
  connection.query(
    'SELECT * FROM project WHERE project_type ilike $1 ORDER BY name',
    [ProjectType],
  );

module.exports = getProjects;
