const logout = (req, res) => {
  res.clearCookie('token').redirect('/login');
  res.json({ statusCode: 200 });
};

module.exports = logout;
