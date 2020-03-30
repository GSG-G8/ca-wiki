const deleteCohort = require('../../../../database/queries/cohort/deleteCohort');

const cohortDelete = async (req, res, next) => {
  try {
    await deleteCohort(req.params.cohortId);
    res.json({
      StatusCode: 200,
      data: { message: 'Cohort deleted successfully' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  cohortDelete,
};
