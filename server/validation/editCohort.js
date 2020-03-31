const yup = require('yup');

exports.editCohortSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  imgUrl: yup.string().url().required(),
  githubLink: yup.string().url().required(),
});