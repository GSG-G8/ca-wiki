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
      res.status(404).json({
        StatusCode: 404,
        data: { message: 'Project does not exist' },
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = deleteProjectData;
