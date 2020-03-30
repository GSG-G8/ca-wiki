const connection = require('../../config/connection');

const editProject = (
  name,
  description,
  imgUrl,
  githubLink,
  websiteLink,
  projectType,
  cohortId,
  projectId,
) =>
  connection.query(
    'UPDATE project SET (name, description, img_url, github_link, website_link, project_type, cohort_id) VALUES ($1, $2, $3, $4, $5, $6, $7) WHERE id = $8',
    [
      name,
      description,
      imgUrl,
      githubLink,
      websiteLink,
      projectType,
      cohortId,
      projectId,
    ],
  );

module.exports = editProject;
