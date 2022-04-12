const express = require('express');
const morgan = require('morgan');
const expressJwt = require('express-jwt');

const shoeRouter = require('./routes/shoeRouter');
const authRouter = require('./routes/authRouter');

const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// ROUTES
app.use('/auth', authRouter);
app.use(
  '/api',
  expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })
);
app.use('/api/shoes', shoeRouter);

// ERROR HANDLING
app.use((err, req, res, next) => {
  return res.json({ errorMessage: err.message });
});

const path = require('path');

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/build/index.html'));
});

module.exports = app;
