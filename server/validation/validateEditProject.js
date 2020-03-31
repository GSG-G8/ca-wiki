const yup = require('yup');

const editProjectSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  imgUrl: yup.string().url().required(),
  githubLink: yup.string().url().required(),
  websiteLink: yup.string().url().required(),
  projectType: yup.string().required(),
  cohortId: yup.number().integer().positive().required(),
  projectId: yup.number().integer().positive().required(),
});

module.exports = editProjectSchema;
