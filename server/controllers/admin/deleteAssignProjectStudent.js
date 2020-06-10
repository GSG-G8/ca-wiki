const { deleteAssignProjectStudentQuery } = require('../../database/queries');

const deleteAssignProjectStudent = async (req, res, next) => {
  try {
    const check = await deleteAssignProjectStudentQuery(req.body);

    const { rowCount } = check;
    if (rowCount !== 0) {
      res.json({
        StatusCode: 200,
        data: { message: `old ${rowCount} students deleted successfully` },
      });
    } else {
      res.status(400).json({
        StatusCode: 400,
        data: { message: 'student project does not exist' },
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = deleteAssignProjectStudent;
