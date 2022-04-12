const Shoe = require('../models/shoe');

exports.getAllShoes = async (req, res, next) => {
  try {
    const shoes = await Shoe.find({});
    return res.status(200).json(shoes);
  } catch (err) {
    return next(err);
  }
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
      shoe: shoe,
    });
  } catch (err) {
    res.status(500);
    return next(err);
  }
};

exports.createShoe = async (req, res, next) => {
  try {
    const shoe = await Shoe.create({
      ...req.body,
      user: req.user._id,
    });
    return res.status(201).json(shoe);
  } catch (err) {
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
