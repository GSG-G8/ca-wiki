const { getStudentProjectsQuery } = require('../database/queries');

const getStudentProjects = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    if (studentId > 0) {
      const { rows } = await getStudentProjectsQuery(studentId);
      if (rows[0]) {
        res.json({ statusCode: 200, data: rows });
      } else {
        res.json({
          statusCode: 200,
          message: 'There is no projects for this student id',
        });
      }
    } else {
      res.status(404).json({
        statusCode: 404,
        message: 'Invalid id',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getStudentProjects;
