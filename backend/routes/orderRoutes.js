const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  getOrderStats
} = require('../controllers/orderController');
const { validateOrder, validateId } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

// All order routes require authentication
router.use(authenticateToken);

// Create new order
router.post('/', validateOrder, createOrder);

// Get user's orders
router.get('/me', getUserOrders);

// Get order by ID
router.get('/:id', validateId, getOrderById);

// Admin routes (in a real app, you'd add admin role check)
router.get('/admin/all', getAllOrders);
router.get('/admin/stats', getOrderStats);
router.put('/:id/status', validateId, updateOrderStatus);

module.exports = router;
