const express = require('express');
const router = express.Router();

const shoeController = require('../controllers/shoeController');
const { getAllShoes, createShoe, updateShoe, deleteShoe } = shoeController;

router.route('/').get(getAllShoes).post(createShoe);
router.route('/:id').put(updateShoe).delete(deleteShoe);

module.exports = router;
