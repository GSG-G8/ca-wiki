const connection = require('../../config/connection');

const getSpecificAlumnit = (id) =>
  connection.query('select * from cohort where id = $1', [id]);

module.exports = getSpecificAlumnit;
