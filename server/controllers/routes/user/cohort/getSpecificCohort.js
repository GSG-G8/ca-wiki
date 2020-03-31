const getCohortQuery = require('../../../../database/queries');

exports.getSpecificCohort = async (req, res) => {
  try {
    const { cohortid } = req.params;
    const { rows } = await getCohortQuery(cohortid);
    const data = { ...rows[0] };
    if (data.id) {
      res.json({ statusCode: 200, data });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(404).json({
      statusCode: 404,
      message: "Sorry There's no cohort for this id",
    });
  }
};
