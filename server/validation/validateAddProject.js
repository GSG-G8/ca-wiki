const yup = require('yup');

const validateAddProject = (req, res, next) => {
  const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    imgUrl: yup.string().url().required(),
    githubLink: yup.string().url().required(),
    websiteLink: yup.string().url().required(),
    projectType: yup.string().required(),
    cohortId: yup.number().integer().positive().required(),
  });
  const projectData = {
    name: req.body.name,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
    githubLink: req.body.githubLink,
    websiteLink: req.body.websiteLink,
    projectType: req.body.projectType,
    cohortId: req.body.cohortId,
  };

  schema
    .validate(projectData)
    .then(() => {
      next();
    })
    .catch((err) => {
      next(err.message);
    });
};

module.exports = validateAddProject;
