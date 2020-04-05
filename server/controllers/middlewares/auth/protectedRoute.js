const jwt = require('jsonwebtoken');

const protectedRoute = async (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, token) => {
    if (err) {
      res.status(401).json({ statusCode: 401, message: 'Un-Authorized' });
    } else {
      req.user = token;
      next();
    }
  });
};

module.exports = protectedRoute;
