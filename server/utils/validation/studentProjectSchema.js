const yup = require('yup');

const studentProjectSchema = yup.object({
  projectId: yup.number().integer().positive().required(),
  student1Id: yup.number().integer().positive().required(),
  student2Id: yup.number().integer().positive(),
  student3Id: yup.number().integer().positive(),
  student4Id: yup.number().integer().positive(),
});

module.exports = studentProjectSchema;
