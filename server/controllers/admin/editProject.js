const { editProjectQuery } = require('../../database/queries');
const { projectSchema } = require('../../utils');

const editProject = async (req, res, next) => {
  try {
    await projectSchema.validate(
      { ...req.body, projectId: req.params.projectId },
      { abortEarly: false },
    );
    req.body.projectId = req.params.projectId;
    await editProjectQuery(req.body);
    res.json({
      StatusCode: 200,
      data: { message: 'project updated successfully' },
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

module.exports = editProject;
