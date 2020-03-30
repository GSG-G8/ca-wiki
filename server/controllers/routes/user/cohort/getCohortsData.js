const { getCohorts } = require('../../../../database/queries');

const getCohortsData = async (req, res, next) => {
  try {
    const { rows } = await getCohorts();
    console.log(rows);
    res.json({ msg: 'test' });
  } catch (err) {
    next(err);
  }
};
module.exports = { getCohortsData };
