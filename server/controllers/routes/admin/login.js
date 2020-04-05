const bcrypt = require('bcrypt');
const { loginSchema } = require('../../../validation');

const login = async (req, res, next) => {
  try {
    const hashP =
      '$2b$10$vn9nkZiBDjonmpgYwM.JKupf9K/Zz4SaY/XPIe91W3oksCtO40tTa';
    const data = await loginSchema.validate(req.body, { abortEarly: false });
    bcrypt.hash(data.password, 10, (err, hash) => {
      // eslint-disable-next-line no-console
      console.log(hash);
    });
    bcrypt.compare(req.body.password, hashP, (err, result) => {
      if (err) {
        next(err);
      } else {
        // eslint-disable-next-line no-console
        console.log(result);
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
