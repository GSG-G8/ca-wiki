const { studentProjectQuery } = require('../../../../database/queries');
const { generalSchema } = require('../../../../validation');

const getStudentProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    await generalSchema.validate({ projectId });
    const { rows } = await studentProjectQuery(projectId);
    res.json({ statusCode: 200, data: rows });
  } catch (err) {
    if (err.errors) {
      res.status(404).json({
        statusCode: 404,
        message: err.errors,
      });
    }
    next(err);
  }
};

module.exports = getStudentProject;
