const {
  postCohort,
} = require('../../../../database/queries/cohort/postCohort');

const addCohort = async (req, res, next) => {
  try {
    const cohortInfo = req.body;
    const result = await postCohort(cohortInfo);
    return res.json({
      StatusCode: 201,
      data: {
        cohortId: result.rows[0].id,
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
