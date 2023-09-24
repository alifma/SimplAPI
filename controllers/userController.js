const db = require('../models');

// Get the current user
exports.getCurrentUser = async (req, res) => {
  const userId = req.user.userId; // Extracted from the authenticated token

  try {
    const user = await db.User.findByPk(userId, {
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
