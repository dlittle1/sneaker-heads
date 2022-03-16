const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const userRouter = express.Router()
const User = require('../models/user')
const Shoe = require('../models/shoe')

userRouter.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(users)
  })
})

userRouter.get('/:userId', (req, res, next) => {
  User.findById({ _id: req.params.userId }, (err, user) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(user)
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

userRouter.get('/:userId/shoes', (req, res, next) =>
  User.find(
    { _id: req.params.userId },
    { shoes: 1, _id: 0 },
    (err, userShoes) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(userShoes)
    }
  )
)

userRouter.put('/:userId/shoes', (req, res, next) => {})

module.exports = userRouter
