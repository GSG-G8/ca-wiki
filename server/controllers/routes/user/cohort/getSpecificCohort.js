const {
  cohort: { getSpecificCohort },
} = require('../../../../database/queries');

exports.getSpecificCohort = async (req, res, next) => {
  try {
    const { cohortid } = req.params;
    const { rows } = await getSpecificCohort(cohortid);
    const data = { ...rows[0] };
    res.json({ statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
