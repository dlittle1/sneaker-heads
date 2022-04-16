const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bigheadsGenerator = require('../utils/bigheads');
const { getRandomOptions } = bigheadsGenerator;

// Signup
authRouter.post('/signup', async (req, res, next) => {
  const { username, password: plainTextPassword, email } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const password = await bcrypt.hash(plainTextPassword, salt);

  const avatar = { ...getRandomOptions() };

  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const foundUserEmail = await User.findOne({ email });
    if (foundUserEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = await User.create({
      username,
      password,
      email,
      avatar,
    });
    const token = jwt.sign(
      {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        type: 'user',
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    console.log(newUserObj);
    return res.status(201).json({ token, user: newUserObj });
  } catch (err) {
    return next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: 'Email not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign(
      {
        _id: foundUser._id,
        username: foundUser.username,
        type: 'user',
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    const userObj = foundUser.toObject();
    delete userObj.password;

    return res.status(200).json({ token, user: userObj });
  } catch (err) {
    return next(err);
  }
});

module.exports = authRouter;
