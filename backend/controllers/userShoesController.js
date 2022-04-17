const Shoe = require('../models/shoe');

exports.getUsersShoes = async (req, res, next) => {
  try {
    const shoes = await Shoe.aggregate([
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

exports.countUsersShoes = async (req, res, next) => {
  try {
    const shoes = await Shoe.aggregate([
      {
        $group: {
          _id: '$user',
          count: { $sum: 1 },
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
          },
          count: 1,
        },
      },
    ]);
    return res.status(200).send(shoes);
  } catch (err) {
    return next(err);
  }
};
