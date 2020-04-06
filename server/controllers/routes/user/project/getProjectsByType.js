const { getProjects } = require('../../../../database/queries');
const { generalSchema } = require('../../../../utils');

const getProjectsData = async (req, res, next) => {
  try {
    const projectType = req.query.type;
    if (projectType) {
      await generalSchema.validate(
        { projectType: projectType.toLowerCase() },
        { abortEarly: false },
      );
      const { rows } = await getProjects(projectType);
      res.json({
        statusCode: 200,
        data: rows,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: 'Please enter valid type',
      });
    }
  } catch (err) {
    if (err.errors) {
      res.status(404).json({
        statusCode: 404,
        message: err.errors,
      });
    } else {
      next(err);
    }
  }
};

module.exports = getProjectsData;
