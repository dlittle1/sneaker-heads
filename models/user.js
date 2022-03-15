const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  shoes: {
    type: Array,
  },
  likedShoes: {
    type: Array,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
})

module.exports = mongoose.model('User', userSchema)
