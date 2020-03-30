const { getCohorts } = require('../../../../database/queries');

exports.getCohortsData = async (req, res, next) => {
  try {
    const result = await getCohorts(result.rows);
  } catch (err) {}
};
