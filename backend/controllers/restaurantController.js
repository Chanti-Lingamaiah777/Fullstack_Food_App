const Restaurant = require('../models/restaurantModel');

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get restaurant by ID
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get restaurants by cuisine
const getRestaurantsByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.params;
    const restaurants = await Restaurant.findByCuisine(cuisine);
    
    res.json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    console.error('Get restaurants by cuisine error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Search restaurants
const searchRestaurants = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const restaurants = await Restaurant.search(q);
    
    res.json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    console.error('Search restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get restaurants with filters
const getRestaurantsWithFilters = async (req, res) => {
  try {
    const filters = {
      cuisine: req.query.cuisine,
      minRating: req.query.minRating ? parseFloat(req.query.minRating) : undefined,
      maxCost: req.query.maxCost ? parseInt(req.query.maxCost) : undefined
    };

    const restaurants = await Restaurant.findWithFilters(filters);
    
    res.json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    console.error('Get restaurants with filters error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantsByCuisine,
  searchRestaurants,
  getRestaurantsWithFilters
};
