const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Create SQLite database connection
const dbPath = path.join(__dirname, '..', '..', 'database', 'food_delivery.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ SQLite database connected successfully');
  }
});

// Initialize database with tables and sample data
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    // Create tables
    const createTables = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Restaurants table
      CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        area TEXT NOT NULL,
        cuisine TEXT NOT NULL,
        rating REAL DEFAULT 0.0,
        avg_cost_for_two INTEGER DEFAULT 0,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Menu items table
      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        veg BOOLEAN DEFAULT 0,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
      );

      -- Orders table
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        items_json TEXT NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        delivery_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    db.exec(createTables, (err) => {
      if (err) {
        console.error('Error creating tables:', err);
        reject(err);
        return;
      }

      // Insert sample data
      const insertSampleData = `
        -- Insert sample restaurants
        INSERT OR IGNORE INTO restaurants (id, name, area, cuisine, rating, avg_cost_for_two, image_url) VALUES
        (1, 'Bangalore Dosa', 'Koramangala', 'South-Indian', 4.5, 200, 'https://images.pexels.com/photos/33614/dosa-indian-food-breakfast.jpg'),
        (2, 'Butter Chicken By Kilo', 'Indiranagar', 'North-Indian', 4.3, 800, 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg'),
        (3, 'Biryani House', 'Whitefield', 'Biryani', 4.7, 600, 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'),
        (4, 'Pizza Corner', 'MG Road', 'Italian', 4.2, 500, 'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg'),
        (5, 'Sushi Express', 'Jayanagar', 'Japanese', 4.4, 700, 'https://images.pexels.com/photos/357743/pexels-photo-357743.jpeg');

        -- Insert menu items for Bangalore Dosa
        INSERT OR IGNORE INTO menu_items (id, restaurant_id, name, description, price, veg, image_url) VALUES
        (1, 1, 'Masala Dosa', 'Crispy dosa filled with spiced potato mixture, served with sambar and coconut chutney', 135.00, 1, 'https://images.unsplash.com/photo-1585937421612-70a0084f804f?w=400&h=300&fit=crop'),
        (2, 1, 'Idli Sambhar', 'Soft steamed rice cakes served with lentil curry and coconut chutney', 80.00, 1, 'https://images.unsplash.com/photo-1585937421612-70a0084f804f?w=400&h=300&fit=crop'),
        (3, 1, 'Rava Dosa', 'Crispy semolina dosa with onions and green chilies', 120.00, 1, 'https://images.unsplash.com/photo-1585937421612-70a0084f804f?w=400&h=300&fit=crop'),
        (4, 1, 'Vada Sambhar', 'Deep-fried lentil fritters served with sambar', 70.00, 1, 'https://images.unsplash.com/photo-1585937421612-70a0084f804f?w=400&h=300&fit=crop');

        -- Insert menu items for Butter Chicken By Kilo
        INSERT OR IGNORE INTO menu_items (id, restaurant_id, name, description, price, veg, image_url) VALUES
        (5, 2, 'Butter Chicken', 'Tender chicken in rich tomato and cream sauce', 400.00, 0, 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg'),
        (6, 2, 'Naan', 'Soft leavened bread baked in tandoor', 60.00, 1, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop'),
        (7, 2, 'Dal Makhani', 'Creamy black lentils slow-cooked with butter and cream', 180.00, 1, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop'),
        (8, 2, 'Chicken Tikka', 'Marinated chicken pieces grilled in tandoor', 350.00, 0, 'https://images.pexels.com/photos/1117868/pexels-photo-1117868.jpeg');

        -- Insert menu items for Biryani House
        INSERT OR IGNORE INTO menu_items (id, restaurant_id, name, description, price, veg, image_url) VALUES
        (9, 3, 'Hyderabadi Chicken Biryani', 'Fragrant basmati rice with tender chicken and aromatic spices', 320.00, 0, 'https://images.pexels.com/photos/5409027/pexels-photo-5409027.jpeg'),
        (10, 3, 'Veg Biryani', 'Aromatic basmati rice with mixed vegetables and spices', 220.00, 1, 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop'),
        (11, 3, 'Mutton Biryani', 'Rich mutton biryani with tender meat and long-grain rice', 450.00, 0, 'https://images.pexels.com/photos/6053913/pexels-photo-6053913.jpeg'),
        (12, 3, 'Egg Biryani', 'Fragrant rice with boiled eggs and aromatic spices', 180.00, 0, 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg');

        -- Insert menu items for Pizza Corner
        INSERT OR IGNORE INTO menu_items (id, restaurant_id, name, description, price, veg, image_url) VALUES
        (13, 4, 'Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella, and fresh basil', 250.00, 1, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'),
        (14, 4, 'Pepperoni Pizza', 'Pizza topped with spicy pepperoni and mozzarella cheese', 320.00, 0, 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg'),
        (15, 4, 'BBQ Chicken Pizza', 'Pizza with BBQ sauce, grilled chicken, and red onions', 380.00, 0, 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg'),
        (16, 4, 'Veg Supreme Pizza', 'Loaded with bell peppers, mushrooms, onions, and olives', 300.00, 1, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop');

        -- Insert menu items for Sushi Express
        INSERT OR IGNORE INTO menu_items (id, restaurant_id, name, description, price, veg, image_url) VALUES
        (17, 5, 'California Roll', 'Crab, avocado, and cucumber wrapped in seaweed and rice', 180.00, 0, 'https://images.pexels.com/photos/357743/pexels-photo-357743.jpeg'),
        (18, 5, 'Salmon Nigiri', 'Fresh salmon slices over seasoned rice', 220.00, 0, 'https://images.pexels.com/photos/3296277/pexels-photo-3296277.jpeg'),
        (19, 5, 'Vegetable Tempura', 'Assorted vegetables deep-fried in light batter', 160.00, 1, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop'),
        (20, 5, 'Chicken Teriyaki', 'Grilled chicken glazed with teriyaki sauce', 280.00, 0, 'https://images.pexels.com/photos/372887/pexels-photo-372887.jpeg');
      `;

      db.exec(insertSampleData, (err) => {
        if (err) {
          console.error('Error inserting sample data:', err);
          reject(err);
          return;
        }
        console.log('✅ Sample data inserted successfully');
        resolve();
      });
    });
  });
};

// Test database connection
const testConnection = async () => {
  try {
    await initializeDatabase();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
};

// Promise-based database operations
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const runInsert = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ insertId: this.lastID, changes: this.changes });
      }
    });
  });
};

const runUpdate = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};

module.exports = {
  db,
  testConnection,
  runQuery,
  runInsert,
  runUpdate
};