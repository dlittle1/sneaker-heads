const Shoe = require('../models/shoe');
const Comment = require('../models/comment');

exports.getAllShoes = async (req, res, next) => {
  let queryObject = { ...req.query };
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

    const shoes = await query
      .populate('user', ['username', 'avatar'])
      .populate([
        { path: 'comments', populate: { path: 'user', select: 'username' } },
      ]);

    return res.status(200).send(shoes);
  } catch (err) {
    return next(err);
  }
};

exports.getOneShoe = async (req, res, next) => {
  try {
    const shoe = await Shoe.findById(req.params.id)
      .populate('user', ['username', 'avatar'])
      .populate([
        { path: 'comments', populate: { path: 'user', select: 'username' } },
      ]);

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
    }).then((shoe) => {
      shoe.populate('user', ['username', 'avatar']);
      return shoe;
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
    return res.status(200).json({
      status: 'success',
      message: 'Shoe deleted!',
      data: { _id: req.params.id },
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
      body: req.body.comment,
      user: req.user._id,
    }).then((comment) => {
      comment.populate('user', ['username', 'avatar']);
      return comment;
    });

    shoe.comments.push(comment._id);
    await shoe.save();

    return res.status(201).send(comment);
  } catch (err) {
    return next(err);
  }
};

exports.likeShoeHandler = async (req, res, next) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    const user = req.user;
    if (shoe.likes.includes(user._id)) {
      const updatedShoe = await Shoe.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: user._id }, $inc: { numLikes: -1 } },
        { new: true }
      );
      return res.status(200).send(updatedShoe);
    } else {
      const updatedShoe = await Shoe.findByIdAndUpdate(
        { _id: req.params.id },
        { $addToSet: { likes: req.user._id }, $inc: { numLikes: 1 } },
        { new: true }
      );
      return res.status(200).send(updatedShoe);
    }
  } catch (err) {
    return next(err);
  }
};
