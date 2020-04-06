const yup = require('yup');

const studentSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  imgUrl: yup.string().url().required(),
  githubLink: yup.string().url().required(),
  cohortId: yup.number().positive().required(),
  studentId: yup.number().positive(),
});

module.exports = studentSchema;
