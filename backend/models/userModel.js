const { runQuery, runInsert, runUpdate } = require('./db');
const bcrypt = require('bcryptjs');

class User {
  // Create a new user
  static async create(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const result = await runInsert(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    
    return result.insertId;
  }

  // Find user by email
  static async findByEmail(email) {
    const rows = await runQuery(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const rows = await runQuery(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update user profile
  static async updateProfile(id, updateData) {
    const { name, email } = updateData;
    await runUpdate(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
  }
}

module.exports = User;