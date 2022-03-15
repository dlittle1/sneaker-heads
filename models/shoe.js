const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  condition: {
    type: String,
  },
  likes: {
    type: Number,
  },
  comments: [{ body: String }],
})

module.exports = mongoose.model('Shoe', shoeSchema)
