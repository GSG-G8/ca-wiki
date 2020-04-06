const { deleteCohortQuery } = require('../../database/queries');

const deleteCohort = async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const check = await deleteCohortQuery(cohortId);
    if (check.rowCount !== 0) {
      res.json({
        StatusCode: 200,
        data: { message: 'Cohort deleted successfully' },
      });
    } else {
      res.status(400).json({
        StatusCode: 400,
        data: { message: 'Cohort does not exist' },
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = deleteCohort;
