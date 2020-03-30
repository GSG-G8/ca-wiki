const addProject = require('../../../../database/queries/project/addProject');

const cohortAdd = async (req, res, next) => {
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
    await addProject(
      name,
      description,
      imgUrl,
      githubLink,
      websiteLink,
      projectType,
      cohortId,
    );
    res.json({
      StatusCode: 200,
      data: { message: 'Cohort Added successfully' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  cohortAdd,
};
