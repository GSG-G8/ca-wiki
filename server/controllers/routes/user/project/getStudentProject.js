const { studentProjectQuery } = require('../../../../database/queries');

const getStudentProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (projectId > 0) {
      const { rows } = await studentProjectQuery(projectId);
      res.json({ statusCode: 200, data: rows });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: 'project does not exists',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getStudentProject;
