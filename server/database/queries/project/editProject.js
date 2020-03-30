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
    'UPDATE project SET name=$1, description=$2, img_url=$3, github_link=$4, website_link=$5, project_type=$6, cohort_id=$7 WHERE id = $8',
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
