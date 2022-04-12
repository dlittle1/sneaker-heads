const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  year: Number,
  condition: String,
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  imgUrl: {
    type: String,
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Shoe', shoeSchema);
