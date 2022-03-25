const express = require('express');
const morgan = require('morgan');

const shoeRouter = require('./routes/shoeRouter');

const app = express();

// MIDDLEWARE
if (process.env.NODE_EVN === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// ROUTES
app.use('/api/shoes', shoeRouter);

module.exports = app;
