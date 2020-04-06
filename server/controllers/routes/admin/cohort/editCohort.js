const { putSpecificCohort } = require('../../../../database/queries');
const { editCohortSchema } = require('../../../../utils');

const editCohort = async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const data = await editCohortSchema.validate(
      { ...req.body, cohortId },
      {
        abortEarly: false,
      },
    );
    const result = await putSpecificCohort(data);
    if (result.rowCount === 1) {
      res.json({ statusCode: 200, message: 'Changed Succefully' });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: "Sorry There's no cohort for this id to change",
      });
    }
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ statusCode: 400, message: err.errors });
    } else {
      next(err);
    }
  }
};

module.exports = editCohort;
