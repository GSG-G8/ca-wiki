const { Pool } = require('pg');
require('dotenv').config();

let dbUrl;

if (process.env.NODE_ENV === 'development') {
  dbUrl = process.env.DB_URL;
} else if (process.env.NODE_ENV === 'production') {
  dbUrl = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.TEST_DB_URL;
}

if (!dbUrl) throw new Error('No Database URL!!!');

const options = {
  connectionString: dbUrl,
  ssl: true,
};

module.exports = new Pool(options);
