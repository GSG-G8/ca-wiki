const { getStudentByIdQuery } = require('../../../../database/queries');

const getStudentById = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    if (studentId > 0) {
      const { rows } = await getStudentByIdQuery(studentId);
      const data = { ...rows[0] };
      if (data.id) {
        res.json({ statusCode: 200, data });
      } else {
        res.status(200).json({
          statusCode: 200,
          message: 'There is no student for this id',
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

module.exports = getStudentById;
