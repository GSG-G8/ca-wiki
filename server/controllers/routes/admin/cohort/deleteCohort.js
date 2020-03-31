const { deleteCohortQuery } = require('../../../../database/queries');

const deleteCohort = async (req, res, next) => {
  try {
    const check = await deleteCohortQuery(req.params.cohortId);
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

module.exports = deleteCohort;
