const express = require('express');
const router = express.Router();
const Shoe = require('../models/shoe');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  Shoe.find({}, (err, shoes) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(shoes);
  });
});

router.post('/:userId', (req, res, next) => {
  const newShoe = new Shoe(req.body);
  newShoe.save((err, savedShoe) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    User.updateOne(
      { _id: req.params.userId },
      { $addToSet: { shoes: savedShoe._id } },
      (err) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        return res.status(200).send(savedShoe);
      }
    );
  });
});

router.put('/:shoeId', (req, res, next) => {
  Shoe.findByIdAndUpdate(
    { _id: req.params.shoeId },
    req.body,
    { new: true },
    (err, updatedShoe) => {
      if (err) {
        res.status(500);
        return next(500);
      }
      return res.status(200).send(updatedShoe);
    }
  );
});

const deleteShoe = (req, res, next) => {
  Shoe.findByIdAndDelete({ _id: req.params.shoeId }, (err, deletedShoe) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(`successfully deleted ${deletedShoe.name}`);
  });
};

router.route('/').get().post();
router.route('/:id').get().put().delete();

module.exports = router;
