const Shoe = require('../models/shoe');

exports.getAllShoes = (req, res, next) => {
  Shoe.find({}, (err, shoes) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(shoes);
  });
};

exports.getOneShoe = async (req, res, next) => {
  try {
    const shoe = await Shoe.findById(req.params.id);

    if (!shoe) {
      res.status(404).json({
        status: 'fail',
        message: 'shoe not found!',
      });
    }
    res.status(200).send({
      status: 'success',
      data: {
        shoe,
      },
    });
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.createShoe = async (req, res, next) => {
  try {
    const newShoe = await Shoe.create(req.body);

    return res.status(200).send(newShoe);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.updateShoe = async (req, res, next) => {
  try {
    const updatedShoe = await Shoe.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).send(updatedShoe);
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.deleteShoe = async (req, res, next) => {
  try {
    await Shoe.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(500);
    return next(err);
  }
};
