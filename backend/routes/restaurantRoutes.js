const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantsByCuisine,
  searchRestaurants,
  getRestaurantsWithFilters
} = require('../controllers/restaurantController');
const { validateId, validateCuisine, validateSearch, validateFilters } = require('../middleware/validation');

// Get all restaurants
router.get('/', getAllRestaurants);

// Get restaurants with filters
router.get('/filter', validateFilters, getRestaurantsWithFilters);

// Search restaurants
router.get('/search', validateSearch, searchRestaurants);

// Get restaurants by cuisine
router.get('/cuisine/:cuisine', validateCuisine, getRestaurantsByCuisine);

// Get restaurant by ID
router.get('/:id', validateId, getRestaurantById);

module.exports = router;
