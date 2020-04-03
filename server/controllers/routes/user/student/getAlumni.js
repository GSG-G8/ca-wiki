const { getAlumniQuery } = require('../../../../database/queries');

const getAlumni = async (req, res, next) => {
  try {
    const { rows } = await getAlumniQuery();
    if (rows.length > 0) {
      res.json({ statusCode: 200, data: rows });
    } else {
      res.json({ statusCode: 200, message: 'No Data' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getAlumni;
