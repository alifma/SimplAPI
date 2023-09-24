const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Create a new item (POST)
router.post('/', authMiddleware.authenticateToken, itemController.createItem);

// Get all items (GET)
router.get('/', itemController.getAllItems);

// Get a specific item by ID (GET)
router.get('/:id', itemController.getItemById);

// Update an item by ID (PUT)
router.put('/:id', authMiddleware.authenticateToken, itemController.updateItem);

// Delete an item by ID (DELETE)
router.delete('/:id', authMiddleware.authenticateToken, itemController.deleteItem);

module.exports = router;
