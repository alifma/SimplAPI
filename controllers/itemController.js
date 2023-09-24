const db = require('../models');
const {Op} = require('sequelize');

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const newItem = await db.Item.create({ name, description, price });

    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error: error.message });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const { limit = 10, page = 1, search = '' } = req.query;
    const offset = (page - 1) * limit;
    // Construct a where clause to filter items based on the search parameter
    const whereClause = search ? { name: { [Op.like]: `%${search}%` } } : {};

    const { count, rows: items } = await db.Item.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({ data: items, total: count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

// Get a specific item by ID
exports.getItemById = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await db.Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
  const itemId = req.params.id;
  const { name, description, price } = req.body;

  try {
    const item = await db.Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.name = name;
    item.description = description;
    item.price = price;

    await item.save();

    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await db.Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.destroy();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};
