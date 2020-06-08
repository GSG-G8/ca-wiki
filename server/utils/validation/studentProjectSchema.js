const yup = require('yup');

const studentProjectSchema = yup.object({
  studentId: yup.number().integer().positive().required(),
  projectId: yup.number().integer().positive().required(),
});

module.exports = studentProjectSchema;
