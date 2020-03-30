const deleteCohort = require('../../../../database/queries/cohort/deleteCohort');

const cohortDelete = async (req, res, next) => {
  try {
    const check = await deleteCohort(req.params.cohortId);
    if (check.rowCount !== 0) {
      res.json({
        StatusCode: 200,
        data: { message: 'Cohort deleted successfully' },
      });
    } else {
      const err = new Error();
      err.message = 'cohort id does not exist';
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  cohortDelete,
};
