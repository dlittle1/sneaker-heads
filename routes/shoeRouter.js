const express = require('express')
const shoeRouter = express.Router()
const Shoe = require('../models/shoe')
const User = require('../models/user')

shoeRouter.get('/', (req, res, next) => {
  Shoe.find({}, (err, shoes) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(shoes)
  })
})

shoeRouter.post('/:userId', (req, res, next) => {
  const newShoe = new Shoe(req.body)
  newShoe.save((err, savedShoe) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    User.updateOne(
      { _id: req.params.userId },
      { $addToSet: { shoes: savedShoe._id } },
      (err) => {
        if (err) {
          res.status(500)
          return next(err)
        }
        return res.status(200).send(savedShoe)
      }
    )
  })
})

shoeRouter.put('/:shoeId', (req, res, next) => {
  Shoe.findByIdAndUpdate(
    { _id: req.params.shoeId },
    req.body,
    { new: true },
    (err, updatedShoe) => {
      if (err) {
        res.status(500)
        return next(500)
      }
      return res.status(200).send(updatedShoe)
    }
  )
})

shoeRouter.delete('/:shoeId', (req, res, next) => {
  Shoe.findByIdAndDelete({ _id: req.params.shoeId }, (err, deletedShoe) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(`successfully deleted ${deletedShoe.name}`)
  })
})

module.exports = shoeRouter
