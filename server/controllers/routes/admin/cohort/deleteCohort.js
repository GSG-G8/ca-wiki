const { deleteCohort } = require('../../../../database/queries');

const cohortDelete = async (req, res, next) => {
  try {
    const test = await deleteCohort(req.params.cohortId);
    if (test.rowCount !== 0) {
      res.json({
        StatusCode: 200,
        data: { message: 'Cohort deleted successfully' },
      });
    } else {
      const err = new Error();
      err.msg = 'chohrt id not found';
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = cohortDelete;
