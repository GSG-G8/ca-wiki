const {
  getProjects,
} = require('../../../../database/queries/project/getProjects');

const getProjectsData = async (req, res, next) => {
  try {
    const { rows } = await getProjects();
    res.json({
      StatusCode: 200,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProjectsData,
};
