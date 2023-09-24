const db = require('../models');

// Get the current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] }, // Exclude password field from response
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current user', error: error.message });
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  try {
    const currentUser = await db.User.findByPk(req.user.userId);
    if (currentUser.role != 'admin') {
      return res.status(401).json({ message: 'unauthorized' });
    }
    const user = await db.User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }, // Exclude password field from response
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current user', error: error.message });
  }
};

// Get user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await db.User.findAll({ where: { username: req.username }, limit: 1 }, {
      attributes: { exclude: ['password'] }, // Exclude password field from response
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current user', error: error.message });
  }
};

// Delete an item by ID
exports.deleteUser = async (req, res) => {
  try {
    const currentUser = await db.User.findByPk(req.user.userId);
    if (currentUser.role != 'admin') {
      return res.status(401).json({ message: 'unauthorized' });
    }
    const user = await db.User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    await user.destroy();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};