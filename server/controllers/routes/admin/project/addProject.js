const { addProjectQuery } = require('../../../../database/queries');
const { projectSchema } = require('../../../../validation');

const addProject = async (req, res, next) => {
  try {
    await projectSchema.validate(req.body, { abortEarly: false });
    await addProjectQuery(req.body);
    res.status(200).json({
      StatusCode: 200,
      data: { message: 'Project Added successfully' },
    });
  } catch (err) {
    if (err.errors) {
      res.json({
        StatusCode: 400,
        data: { message: err.errors },
      });
    } else {
      next(err);
    }
  }
};

module.exports = addProject;
