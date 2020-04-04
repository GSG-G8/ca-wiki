const { getCohortProjectsQuery } = require('../../../../database/queries');
const { generalSchema } = require('../../../../validation');

const getCohortProjects = async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const projectType = req.query.type;
    await generalSchema.validate(
      { cohortId, projectType: projectType.toLowerCase() },
      { abortEarly: false },
    );
    const { rows } = await getCohortProjectsQuery(cohortId, projectType);
    res.json({ statusCode: 200, data: rows });
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
