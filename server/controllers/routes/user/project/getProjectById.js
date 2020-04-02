const { getProjectById } = require('../../../../database/queries');

const getProjectData = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (projectId > 0) {
      const { rows } = await getProjectById(projectId);
      const data = { ...rows[0] };
      if (data.id) {
        res.json({ statusCode: 200, data });
      } else {
        res.status(200).json({
          statusCode: 200,
          message: 'There is no project for this id',
        });
      }
    } else {
      res.status(404).json({
        statusCode: 404,
        message: 'Invalid id',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getProjectData;
