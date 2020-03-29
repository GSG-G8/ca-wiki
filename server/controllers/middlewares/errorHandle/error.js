exports.client = (req, res) => {
  res.status(404).json('404', { title: 'page not found 404' });
};

exports.server = (err, req, res, next) => {
  res.status(500).json('500', { title: 'internal server error 500', err });
};
