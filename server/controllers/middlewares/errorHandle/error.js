/* eslint-disable no-unused-vars */

exports.serverError = (err, req, res, next) => {
  res
    .status(500)
    .json({ StatusCode: '500', title: 'internal server error 500', err });
};
