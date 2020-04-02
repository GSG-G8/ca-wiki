const express = require('express');
const compression = require('compression');
const { join } = require('path');

const controller = require('./controllers');
const { clientError } = require('./controllers/middlewares/errorHandle');
const { serverError } = require('./controllers/middlewares/errorHandle');

const app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use('/api/v1/', controller);

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use(clientError);
app.use(serverError);

module.exports = app;
