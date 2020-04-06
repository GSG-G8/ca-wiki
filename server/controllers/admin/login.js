const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { loginSchema } = require('../../utils');
const { loginQuery } = require('../../database/queries');

const login = async (req, res, next) => {
  try {
    const { username, password } = await loginSchema.validate(req.body, {
      abortEarly: false,
    });
    const userData = await loginQuery(username);
    if (userData.rows[0]) {
      const { password: hashedPasswored } = userData.rows[0];
      const { id: userId } = userData.rows[0];
      const match = await compare(password, hashedPasswored);
      if (match) {
        const token = sign({ id: userId }, process.env.SECRET_KEY);
        res.cookie('token', token);
        res.json({ message: 'logged in successfully' });
      } else {
        res
          .status(400)
          .json({ statusCode: 400, message: 'Password is incorrect' });
      }
    } else {
      res.status(400).json({ statusCode: 400, message: "user doesn't exist" });
    }
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
