const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const db = require('./models');

app.use(bodyParser.json());

// Import your route handlers
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const { createDefaultUser } = require('./controllers/authController');

// Use route handlers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/users', userRoutes);

db.sequelize.sync().then(async () => {
  // Initialize default user
  const defaultUser = {
    username: 'admin',
    password: 'admin',
    role: 'admin',
  };
  await createDefaultUser(defaultUser).then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch((error) => {
    console.log("failed to start the server: ", error)
  })
});
