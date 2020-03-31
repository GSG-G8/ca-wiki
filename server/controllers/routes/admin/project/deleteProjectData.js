const { deleteProject } = require('../../../../database/queries');

const deleteProjectData = async (req, res, next) => {
  try {
    const result = await deleteProject(req.params.projectId);
    if (result.rowCount !== 0) {
      res.json({
        StatusCode: 200,
        data: { message: 'Project deleted successfully' },
      });
    } else {
      const err = new Error('project id does not exist');
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { deleteProjectData };
