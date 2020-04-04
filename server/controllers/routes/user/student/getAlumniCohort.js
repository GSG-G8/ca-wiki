const { getSpecificAlumni } = require('../../../../database/queries');
const { getCohortQuery } = require('../../../../database/queries');

const getAlumniCohort = async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    if (cohortId > 0) {
      const checkCohort = await getCohortQuery(cohortId);
      if (checkCohort.rowCount !== 0) {
        const { rows } = await getSpecificAlumni(cohortId);
        res.json({ statusCode: 200, data: rows });
      } else {
        res.status(404).json({
          statusCode: 404,
          message: 'cohort does not exists',
        });
      }
    } else {
      res
        .status(404)
        .json({ statusCode: 404, message: 'You enterd wrong cohort ID' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getAlumniCohort;
