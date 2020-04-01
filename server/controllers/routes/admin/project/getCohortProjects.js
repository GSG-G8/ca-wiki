const { getCohortProjectsQuery } = require('../../../../database/queries');

const getCohortProjects = async (req, res, next) => {
  const { cohortId } = req.params;
  const projectType = req.query.type;
  try {
    const { rows } = await getCohortProjectsQuery(cohortId, projectType);
    res.json(rows);
  } catch (err) {
    next(err);
  }
  //   try {
  //     const { cohortId } = req.params;
  //     if (cohortId > 0) {
  //       const data = { ...rows[0] };
  //       if (data.id) {
  //         res.json({ statusCode: 200, data });
  //       } else {
  //         res.status(404).json({
  //           statusCode: 404,
  //           message: "Sorry There's no cohort for this id",
  //         });
  //       }
  //     } else {
  //       res.status(404).json({
  //         statusCode: 404,
  //         message: 'You enterd wrong cohort ID',
  //       });
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
};

module.exports = getCohortProjects;
