const { verify } = require('jsonwebtoken');

const protectedRoute = async (req, res, next) => {
  verify(req.cookies.token, process.env.SECRET_KEY, (err) => {
    if (err) {
      res.status(401).json({ statusCode: 401, message: 'Un-Authorized' });
    } else {
      next();
    }
  });
};

module.exports = protectedRoute;
