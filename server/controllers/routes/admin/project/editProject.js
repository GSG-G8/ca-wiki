const { editProjectQuery } = require('../../../../database/queries');
const { editProjectSchema } = require('../../../../validation');

const editProject = async (req, res, next) => {
  try {
    req.body.projectId = req.params.projectId;
    await editProjectSchema.validate(req.body);
    await editProjectQuery(req.body);
    res.json({
      StatusCode: 200,
      data: { message: 'project updated successfully' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editProject;
