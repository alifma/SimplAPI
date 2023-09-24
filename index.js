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

// Use route handlers
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
