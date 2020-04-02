const { getSpecificAlumnit } = require('../../../../database/queries');

const getAlumniCohort = async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    if (cohortId > 0) {
      const { rows } = await getSpecificAlumnit(cohortId);
      const data = { ...rows[0] };
      if (data.id) {
        res.json({ statusCode: 200, data });
      } else {
        res.status(404).json({
          statusCode: 404,
          message: "Sorry There's no Alumni for this Cohort id",
        });
      }
    } else {
      res
        .status(404)
        .json({ statusCode: 404, message: 'You enterd wrong cohort ID' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getAlumniCohort;
