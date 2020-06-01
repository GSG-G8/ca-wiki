const yup = require('yup');

const generalSchema = yup.object({
  cohortId: yup.number().positive(),
  studentId: yup.number().positive(),
  projectId: yup.number().positive(),
  projectType: yup
    .string()
    .oneOf(['internal', 'remotely', 'INTERNAL', 'REMOTELY']),
});

module.exports = generalSchema;
