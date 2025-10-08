const MenuItem = require('../models/menuModel');

// Get menu items by restaurant ID
const getMenuByRestaurantId = async (req, res) => {
  try {
    const { id } = req.params;
    const filters = {
      veg: req.query.veg !== undefined ? req.query.veg === 'true' : undefined,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      search: req.query.search,
      sortBy: req.query.sortBy
    };

    const menuItems = await MenuItem.findWithFilters(id, filters);
    
    res.json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get menu item by ID
const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findById(id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Search menu items across all restaurants
const searchMenuItems = async (req, res) => {
  try {
    const filters = {
      veg: req.query.veg !== undefined ? req.query.veg === 'true' : undefined,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      search: req.query.q,
      cuisine: req.query.cuisine
    };

    const menuItems = await MenuItem.findAll(filters);
    
    res.json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    console.error('Search menu items error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getMenuByRestaurantId,
  getMenuItemById,
  searchMenuItems
};
