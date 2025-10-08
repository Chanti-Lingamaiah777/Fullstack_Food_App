const { runQuery } = require('./db');

class Restaurant {
  // Get all restaurants
  static async findAll() {
    const rows = await runQuery(
      'SELECT * FROM restaurants ORDER BY rating DESC'
    );
    return rows;
  }

  // Get restaurant by ID
  static async findById(id) {
    const rows = await runQuery(
      'SELECT * FROM restaurants WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Get restaurants by cuisine
  static async findByCuisine(cuisine) {
    const rows = await runQuery(
      'SELECT * FROM restaurants WHERE cuisine = ? ORDER BY rating DESC',
      [cuisine]
    );
    return rows;
  }

  // Search restaurants by name or area
  static async search(query) {
    const searchTerm = `%${query}%`;
    const rows = await runQuery(
      'SELECT * FROM restaurants WHERE name LIKE ? OR area LIKE ? ORDER BY rating DESC',
      [searchTerm, searchTerm]
    );
    return rows;
  }

  // Get restaurants with filters
  static async findWithFilters(filters) {
    let query = 'SELECT * FROM restaurants WHERE 1=1';
    const params = [];

    if (filters.cuisine) {
      query += ' AND cuisine = ?';
      params.push(filters.cuisine);
    }

    if (filters.minRating) {
      query += ' AND rating >= ?';
      params.push(filters.minRating);
    }

    if (filters.maxCost) {
      query += ' AND avg_cost_for_two <= ?';
      params.push(filters.maxCost);
    }

    query += ' ORDER BY rating DESC';

    const rows = await runQuery(query, params);
    return rows;
  }
}

module.exports = Restaurant;