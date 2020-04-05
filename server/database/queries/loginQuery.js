const connection = require('../config/connection');

const loginQuery = (username) =>
  connection.query('SELECT * FROM admin WHERE username = $1', [username]);

module.exports = loginQuery;
