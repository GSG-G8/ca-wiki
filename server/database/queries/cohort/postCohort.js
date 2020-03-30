const connection = require('../../config/connection');

exports.postCohort = (reqData) => {
  const { cName, cDescription, cImgUrl, cGithub } = reqData;
  return connection.query(
    'INSERT INTO cohort (name, description, img_url, github_link) VALUES ($1, $2, $3, $4) RETURNING id;',
    [cName, cDescription, cImgUrl, cGithub],
  );
};
