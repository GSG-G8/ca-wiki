const connection = require('../../config/connection');

const addStudent = (data) => {
  const { name, email, imgUrl, githubLink, cohortId } = data;
  return connection.query(
    'INSERT INTO student (name, email, img_url, github_link, cohort_id) VALUES ($1, $2, $3, $4, $5)',
    [name, email, imgUrl, githubLink, cohortId],
  );
};

module.exports = addStudent;
