const connection = require('../../config/connection');

const putStudent = (reqData) => {
  const { name, email, imgUrl, githubLink, cohortId } = reqData;
  connection.query(
    'UPDATE student SET name = $1, email = $2, img_url = $3, github_link = $4, cohort_id = $5',
    [name, email, imgUrl, githubLink, cohortId],
  );
};

module.exports = putStudent;
