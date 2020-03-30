const {
  cohort: { getSpecificCohort },
} = require('../../../../database/queries');

exports.getSpecificCohort = async (req, res, next) => {
  try {
    const { cohortid } = req.params;
    const { rows } = await getSpecificCohort(cohortid);
    const data = { ...rows[0] };
    if (data.id) {
      res.status(200).json({ statusCode: 200, data });
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "Sorry There's no cohort for this id",
      });
    }
  } catch (err) {
    next(err);
  }
};
