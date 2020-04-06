const { studentProjectQuery } = require('../database/queries');
const { generalSchema } = require('../utils');

const getStudentProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    await generalSchema.validate({ projectId });
    const { rows } = await studentProjectQuery(projectId);
    const students = rows.map((student) => student.name);
    res.json({ statusCode: 200, data: students });
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

module.exports = getStudentProject;
