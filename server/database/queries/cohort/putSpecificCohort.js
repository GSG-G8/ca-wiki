const connection = require('../../config/connection');

const putSpecificCohort = (req) => {
  const { name, description, imgUrl, githubLink, cohortId } = req;
  return connection.query(
    'UPDATE cohort SET name = $1, description = $2, img_url = $3, github_link = $4 WHERE id = $5 ',
    [name, description, imgUrl, githubLink, cohortId],
  );
};

module.exports = putSpecificCohort;
