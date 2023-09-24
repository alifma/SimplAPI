const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration (POST)
router.post('/register', authController.register);

// User login (POST)
router.post('/login', authController.login);

module.exports = router;
