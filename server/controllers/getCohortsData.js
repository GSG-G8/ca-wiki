const { getCohorts } = require('../database/queries');

const getCohortsData = async (req, res, next) => {
  try {
    const { rows } = await getCohorts();
    res.json({ status: 200, data: rows });
  } catch (err) {
    next(err);
  }
};
module.exports = getCohortsData;
