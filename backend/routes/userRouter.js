const express = require('express');
const userRouter = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

userRouter.route('/').get(getAllUsers);
userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = userRouter;
