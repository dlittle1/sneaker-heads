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
} = shoeController;

router.route('/').get(getAllShoes).post(createShoe);
router.route('/:id').get(getOneShoe).put(updateShoe).delete(deleteShoe);
router.route('/:id/comments').post(createComment);

module.exports = router;
