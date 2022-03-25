const express = require('express');
const morgan = require('morgan');

const shoeRouter = require('./routes/shoeRouter');

const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// ROUTES
app.use('/api/shoes', shoeRouter);

app.use((err, req, res, next) => {
  return res.json({ errorMessage: err.message });
});

const path = require('path');

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/build/index.html'));
});

module.exports = app;
