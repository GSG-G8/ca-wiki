const { addStudent } = require('../../../../database/queries');
const { studentSchema } = require('../../../../validation');

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
    } else {
      next(err);
    }
  }
};

module.exports = addStudentData;
