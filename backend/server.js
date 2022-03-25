const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('connected to database'));

app.use((err, res) => {
  return res.json({ errorMessage: err.message });
});

const path = require('path');

app.use(express.static(path.join(__dirname, '../client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
