const { default: mongoose } = require('mongoose');
const Shoe = require('../models/shoe');
const User = require('../models/user');

exports.getUsersShoes = async (req, res, next) => {
  try {
    const shoes = await Shoe.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: 'comments',
          foreignField: '_id',
          as: 'comments',
        },
      },
      {
        $group: {
          _id: '$user',
          shoes: { $push: '$$ROOT' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 1,
          user: {
            _id: '$user._id',
            username: '$user.username',
            avatar: '$user.avatar',
            memberSince: '$user.memberSince',
          },
          shoes: 1,
        },
      },
      {
        $sort: {
          'user.username': 1,
        },
      },
    ]);
    return res.status(200).send(shoes);
  } catch (err) {
    return next(err);
  }
};

exports.getUsersShoesById = async (req, res, next) => {
  try {
    console.log(req.params.userId);
    const shoes = await Shoe.aggregate([
      { $group: { _id: '$user', shoes: { $push: '$$ROOT' } } },
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.userId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 1,
          user: {
            _id: '$user._id',
            username: '$user.username',
            avatar: '$user.avatar',
            memberSince: '$user.memberSince',
          },
          shoes: 1,
        },
      },
    ]);
    let totalNumLikes = 0;
    if (shoes.length === 0) {
      const user = await User.findById(
        { _id: req.params.userId },
        { _id: 1, username: 1, avatar: 1, memberSince: 1 }
      );
      return res.status(200).send({ user: user, shoes: [], totalNumLikes });
    } else {
      totalNumLikes = shoes[0].shoes.reduce((numLikes, shoe) => {
        return numLikes + shoe.numLikes;
      }, 0);
    }
    shoes[0].totalNumLikes = totalNumLikes;

    return res.status(200).send(shoes[0]);
  } catch (err) {
    return next(err);
  }
};
