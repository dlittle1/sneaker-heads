const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')

userRouter.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(users)
  })
})

userRouter.post('/', (req, res, next) => {
  const newUser = new User(req.body)
  newUser.save((err, savedUser) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(savedUser)
  })
})

userRouter.put('/:userId', (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.params.userId },
    req.body,
    {
      new: true,
    },
    (err, updatedUser) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedUser)
    }
  )
})

userRouter.delete('/:userId', (req, res, next) => {
  User.findByIdAndDelete({ _id: req.params.userId }, (err, deletedItem) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res
      .status(200)
      .send(`successfully deleted ${deletedItem.firstName}. Goodbye`)
  })
})

module.exports = userRouter
