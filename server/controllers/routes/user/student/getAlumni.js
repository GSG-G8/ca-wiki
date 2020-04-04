const { getAlumniQuery } = require('../../../../database/queries');

const getAlumni = async (req, res, next) => {
  try {
    const { rows } = await getAlumniQuery();
    res.json({ statusCode: 200, data: rows });
  } catch (err) {
    next(err);
  }
};

module.exports = getAlumni;
