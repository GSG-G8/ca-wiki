const express = require('express');
const compression = require('compression');
const { join } = require('path');
const bodyParser = require('body-parser');

const controller = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

app.use(express.json());
app.use(compression());
app.use('/api/v1/', controller);

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
