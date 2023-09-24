const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Get the current user (GET)
router.get('/current', authMiddleware.authenticateToken, userController.getCurrentUser);

module.exports = router;
