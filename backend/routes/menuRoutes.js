const express = require('express');
const router = express.Router();
const {
  getMenuByRestaurantId,
  getMenuItemById,
  searchMenuItems
} = require('../controllers/menuController');
const { validateId, validateFilters, validateSearch } = require('../middleware/validation');

// Search menu items across all restaurants
router.get('/search', validateSearch, searchMenuItems);

// Get menu items by restaurant ID
router.get('/restaurant/:id', validateId, validateFilters, getMenuByRestaurantId);

// Get menu item by ID
router.get('/:id', validateId, getMenuItemById);

module.exports = router;
