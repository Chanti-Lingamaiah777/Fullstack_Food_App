const { runQuery } = require('./db');

class MenuItem {
  // Get menu items by restaurant ID
  static async findByRestaurantId(restaurantId) {
    const rows = await runQuery(
      'SELECT * FROM menu_items WHERE restaurant_id = ? ORDER BY name',
      [restaurantId]
    );
    return rows;
  }

  // Get menu item by ID
  static async findById(id) {
    const rows = await runQuery(
      'SELECT * FROM menu_items WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Get menu items with filters
  static async findWithFilters(restaurantId, filters) {
    let query = 'SELECT * FROM menu_items WHERE restaurant_id = ?';
    const params = [restaurantId];

    if (filters.veg !== undefined) {
      query += ' AND veg = ?';
      params.push(filters.veg);
    }

    if (filters.minPrice) {
      query += ' AND price >= ?';
      params.push(filters.minPrice);
    }

    if (filters.maxPrice) {
      query += ' AND price <= ?';
      params.push(filters.maxPrice);
    }

    if (filters.search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Add sorting
    if (filters.sortBy === 'price_asc') {
      query += ' ORDER BY price ASC';
    } else if (filters.sortBy === 'price_desc') {
      query += ' ORDER BY price DESC';
    } else {
      query += ' ORDER BY name';
    }

    const rows = await runQuery(query, params);
    return rows;
  }

  // Get all menu items (for search across restaurants)
  static async findAll(filters = {}) {
    let query = 'SELECT mi.*, r.name as restaurant_name, r.area FROM menu_items mi JOIN restaurants r ON mi.restaurant_id = r.id WHERE 1=1';
    const params = [];

    if (filters.veg !== undefined) {
      query += ' AND mi.veg = ?';
      params.push(filters.veg);
    }

    if (filters.minPrice) {
      query += ' AND mi.price >= ?';
      params.push(filters.minPrice);
    }

    if (filters.maxPrice) {
      query += ' AND mi.price <= ?';
      params.push(filters.maxPrice);
    }

    if (filters.search) {
      query += ' AND (mi.name LIKE ? OR mi.description LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    if (filters.cuisine) {
      query += ' AND r.cuisine = ?';
      params.push(filters.cuisine);
    }

    query += ' ORDER BY mi.name';

    const rows = await runQuery(query, params);
    return rows;
  }
}

module.exports = MenuItem;