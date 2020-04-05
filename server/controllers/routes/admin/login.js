const bcrypt = require('bcrypt');
const { loginSchema } = require('../../../validation');
const { loginQuery } = require('../../../database/queries');

const login = async (req, res, next) => {
  try {
    const data = await loginSchema.validate(req.body, { abortEarly: false });
    const userData = await loginQuery(data.username);
    // console.log(userData);
    const hashedPasswored = userData.rows[0].password;
    bcrypt.compare(data.password, hashedPasswored, (err, result) => {
      if (err) {
        next(err);
      } else {
        // eslint-disable-next-line no-console
        res.json(result);
      }
    });
  } catch (err) {
    if (err.errors) {
      res.status(400).json({
        statusCode: 400,
        message: err.errors,
      });
    } else {
      next(err);
    }
  }
};

module.exports = login;

// bcrypt.hash(data.password, 10, (err, hash) => {
//   // eslint-disable-next-line no-console
//   console.log(hash);
// });
