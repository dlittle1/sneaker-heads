const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('connected to database'));

app.use((err, req, res, next) => {
  console.log(err);
  return res.send({ errorMessage: err.message });
});

app.listen(9000, () => {
  console.log('app is running on port 9000');
});
