const yup = require('yup');

exports.editCohortSchema = yup.object({
  cohortId: yup.number().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  imgUrl: yup.string().url().required(),
  githubLink: yup.string().url().required(),
});
