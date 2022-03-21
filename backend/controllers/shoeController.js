const Shoe = require('../models/shoe');

exports.getAllShoes = get('/', (req, res, next) => {
  Shoe.find({}, (err, shoes) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(shoes);
  });
});

exports.createShoe = post('/:userId', (req, res, next) => {
  const newShoe = new Shoe(req.body);
  newShoe.save((err, savedShoe) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(savedShoe);
  });
});

exports.updateShoe =
  ('/:shoeId',
  (req, res, next) => {
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

exports.deleteShoe = (req, res, next) => {
  Shoe.findByIdAndDelete({ _id: req.params.shoeId }, (err, deletedShoe) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(`successfully deleted ${deletedShoe.name}`);
  });
};
