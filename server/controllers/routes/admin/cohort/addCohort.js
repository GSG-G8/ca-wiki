const {
  postCohort,
} = require('../../../../database/queries/cohort/postCohort');
const { cohortSchema } = require('../../../../validation/cohortSchema ');

const addCohort = async (req, res, next) => {
  try {
    await cohortSchema.validate(req.body, { abortEarly: false });
    const { rows } = await postCohort(req.body);
    res.json({
      StatusCode: 201,
      data: {
        cohort: rows[0],
        message: `Cohort with Key (name)=(${rows[0].name}) added successfully`,
      },
    });
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ statusCode: 400, data: { message: err.errors } });
    } else if (err.detail) {
      res.status(409).json({
        statusCode: 409,
        data: {
          message: err.detail,
        },
      });
    } else {
      next(err);
    }
  }
};

module.exports = {
  addCohort,
};
