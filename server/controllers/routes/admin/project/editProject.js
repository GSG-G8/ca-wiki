const { editProject } = require('../../../../database/queries');

const projectEdit = async (req, res, next) => {
  try {
    const {
      name,
      description,
      imgUrl,
      githubLink,
      websiteLink,
      projectType,
      cohortId,
    } = req.body;
    const { projectId } = req.params;
    await editProject(
      name,
      description,
      imgUrl,
      githubLink,
      websiteLink,
      projectType,
      cohortId,
      projectId,
    );
    res.json({
      StatusCode: 200,
      data: { message: 'Cohort updated successfully' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = projectEdit;
