const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  version: String,
  year: Number,
  condition: String,
  likes: Number,
  imgUrl: String,
  comments: [{ body: String, user_id: String }],
});

module.exports = mongoose.model('Shoe', shoeSchema);
