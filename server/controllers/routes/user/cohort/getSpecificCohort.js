const { getCohortQuery } = require('../../../../database/queries');

const getSpecificCohort = async (req, res, next) => {
  try {
    const { cohortid } = req.params;
    if (cohortid > 0) {
      const { rows } = await getCohortQuery(cohortid);
      const data = { ...rows[0] };
      if (data.id) {
        res.json({ statusCode: 200, data });
      } else {
        res.status(404).json({
          statusCode: 404,
          message: "Sorry There's no cohort for this id",
        });
      }
    } else {
      res.status(404).json({
        statusCode: 404,
        message: 'You enterd wrong cohort ID',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getSpecificCohort;
