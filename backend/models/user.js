const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  memberSince: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {},
});

userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', userSchema);
