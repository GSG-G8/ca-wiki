const { addProjectQuery } = require('../../database/queries');
const { projectSchema } = require('../../utils');

const addProject = async (req, res, next) => {
  try {
    await projectSchema.validate(req.body, { abortEarly: false });
    const addProjectToData = await addProjectQuery(req.body);
    const projectId = addProjectToData.rows[0].id;

    res.status(201).json({
      StatusCode: 201,
      data: { message: 'Project Added successfully', projectId },
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
