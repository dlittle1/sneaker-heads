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
          },
          shoes: 1,
        },
      },
    ]);
    return res.status(200).send(shoes);
  } catch (err) {
    return next(err);
  }
};
