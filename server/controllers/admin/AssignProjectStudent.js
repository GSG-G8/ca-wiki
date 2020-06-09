const { AssignProjectStudentQuery } = require('../../database/queries');
const { studentProjectSchema } = require('../../utils');

const AssignProjectStudent = async (req, res, next) => {
  try {
    await studentProjectSchema.validate(req.body, { abortEarly: false });
    await AssignProjectStudentQuery(req.body);
    res.status(201).json({
      StatusCode: 201,
      data: { message: 'Project Assigned successfully' },
    });
  } catch (err) {
    if (err.errors) {
      res.status(400).json({
        StatusCode: 400,
        data: { message: err.errors },
      });
    } else {
      next(err);
    }
  }
};

module.exports = AssignProjectStudent;
