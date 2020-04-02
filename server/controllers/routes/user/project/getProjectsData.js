const {
  getProjects,
} = require('../../../../database/queries/project/getProjects');

const getProjectsData = async (req, res, next) => {
  try {
    const projectType = req.query.type;
    const { rows } = await getProjects(projectType);
    if (rows.length > 0) {
      res.json({
        StatusCode: 200,
        data: rows,
      });
    } else {
      res.json({
        StatusCode: 200,
        message: `There is no ${projectType}s in database`,
      });
    }
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ statusCode: 400, data: { message: err.errors } });
    } else {
      next(err);
    }
  }
};

module.exports = {
  getProjectsData,
};
