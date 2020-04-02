const express = require('express');
const compression = require('compression');
const { join } = require('path');

const routes = require('./routes');
const { clientError } = require('./controllers');
const { serverError } = require('./controllers');

const app = express();

app.use(compression());
app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/', routes);

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use(clientError);
app.use(serverError);

module.exports = app;
