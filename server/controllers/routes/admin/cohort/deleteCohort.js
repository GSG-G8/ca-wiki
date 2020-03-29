const deleteCohort = require('../../../../database/queries/cohort/deleteCohort');

const cohortDelete = (req, res, next) => {
  deleteCohort(req.params.cohortId).then(() =>
    res
      .json({
        StatusCode: 200,
        data: { message: 'Cohort deleted successfully' },
      })
      .catch(next),
  );
};

module.exports = {
  cohortDelete,
};
