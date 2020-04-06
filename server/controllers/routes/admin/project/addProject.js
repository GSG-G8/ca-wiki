const { addProjectQuery } = require('../../../../database/queries');
const { projectSchema } = require('../../../../utils');

const addProject = async (req, res, next) => {
  try {
    await projectSchema.validate(req.body, { abortEarly: false });
    await addProjectQuery(req.body);
    res.status(201).json({
      StatusCode: 201,
      data: { message: 'Project Added successfully' },
    });
  } catch (err) {
    if (err.errors) {
      res.status(400).json({
        StatusCode: 400,
        data: { message: err.errors },
      });
    } else {
      next(err);
    }
  }
};

module.exports = addProject;
