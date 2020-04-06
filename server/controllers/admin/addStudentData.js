const { addStudent } = require('../../database/queries');
const { studentSchema } = require('../../utils');

const addStudentData = async (req, res, next) => {
  try {
    await studentSchema.validate(req.body, { abortEarly: false });
    await addStudent(req.body);
    res.status(201).json({
      StatusCode: 201,
      data: { message: 'Student Added successfully' },
    });
  } catch (err) {
    if (err.errors) {
      res.json({
        StatusCode: 400,
        data: { message: err.errors },
      });
    } else if (err.detail) {
      res.status(409).json({
        statusCode: 409,
        data: {
          message: err.detail,
        },
      });
    } else {
      next(err);
    }
  }
};

module.exports = addStudentData;
