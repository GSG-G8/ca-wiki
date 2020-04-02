const { deleteProject } = require('../../../../database/queries');

const deleteProjectData = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (projectId > 0) {
      const check = await deleteProject(projectId);
      if (check.rowCount !== 0) {
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
    } else {
      res.status(404).json({
        StatusCode: 404,
        data: { message: 'You enterd wrong project ID' },
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = deleteProjectData;
