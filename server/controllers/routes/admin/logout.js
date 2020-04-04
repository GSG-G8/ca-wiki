const logout = (req, res) => {
  res.clearCookie = 'token';
  res.json({ statusCode: 200 });
};

module.exports = logout;
