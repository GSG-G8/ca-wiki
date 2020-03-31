const { putSpecificCohort } = require('../../../../database/queries');

exports.editCohort = async (req, res, next) => {
  try {
    const result = await putSpecificCohort(req.params.cohortid, req.body);
    if (result.rowCount === 1) {
      res.json({ statusCode: 200, message: 'Changed Succefully' });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "Sorry There's no cohort for this id to change",
      });
    }
  } catch (err) {
    next(err);
  }
};
