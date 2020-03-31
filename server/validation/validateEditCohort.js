const yup = require('yup');

const validateEditCohort = (req, res, next) => {
  const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    img_url: yup.string().url().required(),
    github_link: yup.string().url().required(),
  });
  const projectData = {
    name: req.body.name,
    description: req.body.description,
    img_url: req.body.img_url,
    github_link: req.body.github_link,
  };

  schema
    .validate(projectData)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({ statusCode: 400, message: err.message });
    });
};

module.exports = validateEditCohort;
