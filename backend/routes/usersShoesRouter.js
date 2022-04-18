const express = require('express');
const router = express.Router();
const controller = require('../controllers/userShoesController');
const { getUsersShoes, getUsersShoesById } = controller;

router.route('/').get(getUsersShoes);
router.route('/:userId').get(getUsersShoesById);

module.exports = router;
