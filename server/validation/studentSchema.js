const yup = require('yup');

const studentSchema = yup.object({
  studentId: yup.number().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  imgUrl: yup.string().url().required(),
  githubLink: yup.string().url().required(),
  cohortId: yup.number().required(),
});

module.exports = studentSchema;
