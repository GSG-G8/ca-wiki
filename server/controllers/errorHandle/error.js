/* eslint-disable no-unused-vars */
exports.clientError = (req, res) => {
  res
    .status(404)
    .json({ StatusCode: '404', data: { message: 'page not found 404' } });
};

exports.serverError = (err, req, res, next) => {
  res.status(500).json({
    StatusCode: '500',
    data: { message: 'internal server error 500', err },
  });
};
