const { editProjectQuery } = require('../../database/queries');
const { projectSchema } = require('../../utils');

const editProject = async (req, res, next) => {
  try {
    await projectSchema.validate(
      { ...req.body, projectId: req.params.projectId },
      { abortEarly: false },
    );
    req.body.projectId = req.params.projectId;
    const result = await editProjectQuery(req.body);
    if (result.rowCount === 1) {
      res.json({
        StatusCode: 200,
        data: { message: 'project updated successfully' },
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        data: {
          message: "Sorry There's no project for this id to change",
        },
      });
    }
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

module.exports = editProject;
