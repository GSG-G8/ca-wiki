const connection = require('../../config/connection');

const putStudent = (reqData) => {
  const { name, email, imgUrl, githubLink, cohortId, studentId } = reqData;
  return connection.query(
    'UPDATE student SET name = $1, email = $2, img_url = $3, github_link = $4, cohort_id = $5 WHERE id = $6',
    [name, email, imgUrl, githubLink, cohortId, studentId],
  );
};

module.exports = putStudent;
