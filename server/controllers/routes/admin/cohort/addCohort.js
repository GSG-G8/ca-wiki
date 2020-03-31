const {
  postCohort,
} = require('../../../../database/queries/cohort/postCohort');

const addCohort = async (req, res, next) => {
  try {
    const { rows } = await postCohort(req.body);
    return res.json({
      StatusCode: 201,
      data: {
        cohortId: rows[0].id,
        message: 'Cohort added successfully',
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCohort,
};
