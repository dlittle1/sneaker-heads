const express = require('express');
const router = express.Router();

const shoeController = require('../controllers/shoeController');
const {
  getAllShoes,
  getOneShoe,
  createShoe,
  updateShoe,
  deleteShoe,
  createComment,
  likeShoeHandler,
} = shoeController;

router.route('/').get(getAllShoes).post(createShoe);
router.route('/:id').get(getOneShoe).put(updateShoe).delete(deleteShoe);
router.route('/:id/comments').post(createComment);
router.route('/:id/like').post(likeShoeHandler);

module.exports = router;
