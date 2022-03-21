const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/sneakerheads', () =>
  console.log('connected to database')
);

app.use('/users', require('./routes/userRouter.js'));
app.use('/shoes', require('./routes/shoeRouter.js'));

app.use((err, req, res, next) => {
  console.log(err);
  return res.send({ errorMessage: err.message });
});

app.listen(9000, () => {
  console.log('app is running on port 9000');
});
