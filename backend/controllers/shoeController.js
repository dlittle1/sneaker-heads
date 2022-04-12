const Shoe = require('../models/shoe');

exports.getAllShoes = async (req, res, next) => {
  let queryObject = { ...req.query };
  const { page, limit, sort, ...query } = queryObject;

  let queryString = JSON.stringify(queryObject);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in|regex)\b/g,
    (match) => `$${match}`
  );

  try {
    let query = Shoe.find(JSON.parse(queryString));
    if (req.query.sort) {
      let sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }

    const shoes = await query.populate([
      {
        path: 'user',
        select: 'username',
      },
      {
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username',
        },
      },
    ]);

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

exports.createComment = async (req, res, next) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    const comment = await Comment.create({
      ...req.body,
      user: req.user._id,
    });
    shoe.comments.push(comment._id);
    await shoe.save();
    return res.status(201).json(comment);
  } catch (err) {
    return next(err);
  }
};

exports.likeShoe = async (req, res, next) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    const user = await User.findById(req.user._id);
    if (shoe.likes.includes(user._id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'You already liked this shoe!',
      });
    }
    await Shoe.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { likes: user._id } },
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'You liked this shoe!',
    });
  } catch (err) {
    return next(err);
  }
};

exports.removeLike = async (req, res, next) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    const user = await User.findById(req.user._id);
    if (!shoe.likes.includes(user._id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'You have not liked this shoe!',
      });
    }
    await Shoe.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { likes: user._id } },
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'You unliked this shoe!',
    });
  } catch (err) {
    return next(err);
  }
};
