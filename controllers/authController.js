const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, JWT_EXPIRATION } = process.env;

// User registration
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await db.User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await db.User.create({ username, password: hashedPassword, role});

    res.status(201).json({ message: 'User registered successfully', id: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await db.User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: JWT_EXPIRATION });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// User default
exports.createDefaultUser = async (defaultUser) => {
  try {
    // Check if the user already exists
    const existingUser = await db.User.findOne({ where: { username: defaultUser.username } });
    if (!existingUser) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(defaultUser.password, 10);
      // Create a new user
      await db.User.create({ username: defaultUser.username, password: hashedPassword, role: defaultUser.role });
      console.log(`Created default user: ${defaultUser.username}:${defaultUser.password}`);
    } else {
      console.log('Default user already exist');
    }
  } catch (error) {
    console.error('Error creating default user:', error);
  }
};

