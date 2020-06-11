const connection = require('../../connection');

const addProjectQuery = (data) => {
  const {
    name,
    description,
    imgUrl,
    githubLink,
    websiteLink,
    projectType,
    cohortId,
  } = data;
  return connection.query(
    'INSERT INTO project (name, description, img_url, github_link, website_link, project_type, cohort_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    [name, description, imgUrl, githubLink, websiteLink, projectType, cohortId],
  );
};

module.exports = addProjectQuery;
