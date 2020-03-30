const connection = require('../../config/connection');

exports.putSpecificCohort = (id, req) =>
  connection.query(
    'UPDATE cohort SET name = $2, description = $3, img_url = $4, github_link = $5 WHERE id = $1 ',
    [id, req.name, req.description, req.img_url, req.github_link],
  );