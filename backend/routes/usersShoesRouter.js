const express = require('express');
const router = express.Router();
const controller = require('../controllers/userShoesController');
const { getUsersShoes } = controller;

router.route('/').get(getUsersShoes);

module.exports = router;
