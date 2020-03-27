const { Pool } = require('pg');
require('dotenv').config();

let dbUrl;

switch (process.env.NODE_ENV) {
  case 'development':
    dbUrl = process.env.DB_URL;
    break;
  case 'production':
    dbUrl = process.env.DATABASE_URL;
    break;
  case 'test':
    dbUrl = process.env.TEST_DB_URL;
    break;
  default:
    dbUrl = '';
}

if (!dbUrl) throw new Error('No Database URL!!!');

const options = {
  connectionString: dbUrl,
  ssl: true,
};

module.exports = new Pool(options);
