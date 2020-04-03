const { getProjects } = require('../../../../database/queries');

const getProjectsData = async (req, res, next) => {
  try {
    const { type } = req.query;
    if (
      type.toLowerCase() === 'internal' ||
      type.toLowerCase() === 'remotely'
    ) {
      const { rows } = await getProjects(type);
      if (rows.length > 0) {
        res.json({
          statusCode: 200,
          data: rows,
        });
      } else {
        res.json({
          statusCode: 200,
          message: `There is no ${type} projects`,
        });
      }
    } else {
      res.status(404).json({
        statusCode: 404,
        message: 'Please enter valid type',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getProjectsData;
