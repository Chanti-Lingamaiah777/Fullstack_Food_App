const { body, param, query } = require('express-validator');

// User validation rules
const validateSignup = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

// Order validation rules
const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Items array is required and cannot be empty'),
  body('items.*.id')
    .isInt({ min: 1 })
    .withMessage('Each item must have a valid ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Each item must have a valid quantity'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('Each item must have a valid price'),
  body('totalAmount')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a valid positive number'),
  body('deliveryAddress')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Delivery address must be between 10 and 500 characters')
];

// Parameter validation
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid ID parameter')
];

const validateCuisine = [
  param('cuisine')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid cuisine parameter')
];

// Query validation
const validateSearch = [
  query('q')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters')
];

const validateFilters = [
  query('minRating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Minimum rating must be between 0 and 5'),
  query('maxCost')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum cost must be a positive integer'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  query('veg')
    .optional()
    .isBoolean()
    .withMessage('Veg filter must be true or false'),
  query('sortBy')
    .optional()
    .isIn(['price_asc', 'price_desc', 'name'])
    .withMessage('Invalid sort option')
];

module.exports = {
  validateSignup,
  validateLogin,
  validateProfileUpdate,
  validateOrder,
  validateId,
  validateCuisine,
  validateSearch,
  validateFilters
};
