const yup = require('yup');

exports.editCohortSchema = yup.object({
  cohortId: yup.number().required(),
  name: yup.string(),
  description: yup.string(),
  imgUrl: yup.string().url(),
  githubLink: yup.string().url(),
});
