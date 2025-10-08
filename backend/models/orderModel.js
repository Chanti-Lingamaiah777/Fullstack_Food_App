const { runQuery, runInsert, runUpdate } = require('./db');

class Order {
  // Create a new order
  static async create(orderData) {
    const { user_id, items_json, total_amount, delivery_address } = orderData;
    
    const result = await runInsert(
      'INSERT INTO orders (user_id, items_json, total_amount, delivery_address) VALUES (?, ?, ?, ?)',
      [user_id, JSON.stringify(items_json), total_amount, delivery_address]
    );
    
    return result.insertId;
  }

  // Get orders by user ID
  static async findByUserId(userId) {
    const rows = await runQuery(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  // Get order by ID
  static async findById(id) {
    const rows = await runQuery(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Update order status
  static async updateStatus(id, status) {
    await runUpdate(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
  }

  // Get all orders (for admin)
  static async findAll() {
    const rows = await runQuery(
      'SELECT o.*, u.name as user_name, u.email FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC'
    );
    return rows;
  }

  // Get order statistics
  static async getStats() {
    const rows = await runQuery(`
      SELECT 
        COUNT(*) as total_orders,
        SUM(total_amount) as total_revenue,
        AVG(total_amount) as avg_order_value,
        COUNT(CASE WHEN status = 'delivered' THEN 1 END) as completed_orders
      FROM orders
    `);
    return rows[0];
  }
}

module.exports = Order;