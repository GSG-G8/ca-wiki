const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ statusCode: 200, message: 'logout succefully' });
};

module.exports = logout;
