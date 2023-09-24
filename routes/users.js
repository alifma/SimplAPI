const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Get the current user (GET)
router.get('/current', authMiddleware.authenticateToken, userController.getCurrentUser);
// Delete the user by ID (DELETE)
router.delete('/:id', authMiddleware.authenticateToken, userController.deleteUser);
// Get the user by ID (GET)
router.get('/:id', authMiddleware.authenticateToken, userController.getUserById);

module.exports = router;
