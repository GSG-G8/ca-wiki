const {
  getProjects,
} = require('../../../../database/queries/project/getProjects');

const getProjectsData = (req, res, next) => {
  getProjects()
    .then(({ rows }) =>
      res.json({
        StatusCode: 200,
        data: rows,
      }),
    )
    .catch((err) => next(err));
};

module.exports = {
  getProjectsData,
};
