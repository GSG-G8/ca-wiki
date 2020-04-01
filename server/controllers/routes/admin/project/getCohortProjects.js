const { getCohortProjectsQuery } = require('../../../../database/queries');

const getCohortProjects = async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const projectType = req.query.type;
    if (cohortId > 0) {
      const { rows } = await getCohortProjectsQuery(cohortId, projectType);
      if (rows.length > 0) {
        res.json({ statusCode: 200, data: rows });
      } else {
        res.json({ statusCode: 200, message: 'No Data' });
      }
    } else {
      res
        .status(404)
        .json({ statusCode: 204, message: 'You enterd wrong cohort ID' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getCohortProjects;
