const {
  postCohort,
} = require('../../../../database/queries/cohort/postCohort');
const { cohortSchema } = require('../../../../validation/cohortSchema ');

const addCohort = async (req, res, next) => {
  try {
    await cohortSchema.validate(req.body, { abortEarly: false });
    const result = await postCohort(req.body);
    const { rows } = result;
    res.json({
      StatusCode: 201,
      data: {
        cohortId: rows[0],
        message: 'Cohort added successfully',
      },
    });
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ statusCode: 400, data: { message: err.errors } });
    } else {
      res.status(409).json({
        statusCode: 409,
        data: {
          message: 'Cohort already exists',
        },
      });
      // next(err);
    }
  }
};

module.exports = {
  addCohort,
};