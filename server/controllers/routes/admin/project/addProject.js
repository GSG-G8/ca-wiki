const { addProjectQuery } = require('../../../../database/queries');

const addProject = async (req, res, next) => {
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
    await addProjectQuery(
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

module.exports = addProject;
