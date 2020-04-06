const { getCohortProjectsQuery } = require('../database/queries');
const { generalSchema } = require('../utils');

const getCohortProjects = async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const projectType = req.query.type;
    if (projectType) {
      await generalSchema.validate(
        { cohortId, projectType: projectType.toLowerCase() },
        { abortEarly: false },
      );
      const { rows } = await getCohortProjectsQuery(cohortId, projectType);
      res.json({ statusCode: 200, data: rows });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "Project Type can't be empty",
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

module.exports = getCohortProjects;
