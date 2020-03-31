const {
  postCohort,
} = require('../../../../database/queries/cohort/postCohort');

const addCohort = async (req, res) => {
  try {
    const { rows } = await postCohort(req.body);
    res.json({
      StatusCode: 201,
      data: {
        cohortId: rows[0].id,
        message: 'Cohort added successfully',
      },
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      data: {
        message: 'Cohort already exists',
      },
    });
  }
};

module.exports = {
  addCohort,
};

// res.status(409).json({
//   StatusCode: 409,
//   data: {
//     message: 'Cohort already exists',
//   },
// });
