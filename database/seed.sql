-- Food Delivery Application Seed Data
USE food_delivery;

-- Insert sample restaurants
INSERT INTO restaurants (name, area, cuisine, rating, avg_cost_for_two, image_url) VALUES
('Bangalore Dosa', 'Koramangala', 'South-Indian', 4.5, 200, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/dosa-2145030_1280.jpg'),
('Butter Chicken By Kilo', 'Indiranagar', 'North-Indian', 4.3, 800, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/butter-chicken-2145031_1280.jpg'),
('Biryani House', 'Whitefield', 'Biryani', 4.7, 600, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/biryani-2145032_1280.jpg'),
('Pizza Corner', 'MG Road', 'Italian', 4.2, 500, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/pizza-2145033_1280.jpg'),
('Sushi Express', 'Jayanagar', 'Japanese', 4.4, 700, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/sushi-2145034_1280.jpg');

-- Insert menu items for Bangalore Dosa
INSERT INTO menu_items (restaurant_id, name, description, price, veg, image_url) VALUES
(1, 'Masala Dosa', 'Crispy dosa filled with spiced potato mixture, served with sambar and coconut chutney', 135.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/dosa-2145030_1280.jpg'),
(1, 'Idli Sambhar', 'Soft steamed rice cakes served with lentil curry and coconut chutney', 80.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/idli-2145035_1280.jpg'),
(1, 'Rava Dosa', 'Crispy semolina dosa with onions and green chilies', 120.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/rava-dosa-2145036_1280.jpg'),
(1, 'Vada Sambhar', 'Deep-fried lentil fritters served with sambar', 70.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/vada-2145037_1280.jpg');

-- Insert menu items for Butter Chicken By Kilo
INSERT INTO menu_items (restaurant_id, name, description, price, veg, image_url) VALUES
(2, 'Butter Chicken', 'Tender chicken in rich tomato and cream sauce', 400.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/butter-chicken-2145031_1280.jpg'),
(2, 'Naan', 'Soft leavened bread baked in tandoor', 60.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/naan-2145038_1280.jpg'),
(2, 'Dal Makhani', 'Creamy black lentils slow-cooked with butter and cream', 180.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/dal-makhani-2145039_1280.jpg'),
(2, 'Chicken Tikka', 'Marinated chicken pieces grilled in tandoor', 350.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/chicken-tikka-2145040_1280.jpg');

-- Insert menu items for Biryani House
INSERT INTO menu_items (restaurant_id, name, description, price, veg, image_url) VALUES
(3, 'Hyderabadi Chicken Biryani', 'Fragrant basmati rice with tender chicken and aromatic spices', 320.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/biryani-2145032_1280.jpg'),
(3, 'Veg Biryani', 'Aromatic basmati rice with mixed vegetables and spices', 220.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/veg-biryani-2145041_1280.jpg'),
(3, 'Mutton Biryani', 'Rich mutton biryani with tender meat and long-grain rice', 450.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/mutton-biryani-2145042_1280.jpg'),
(3, 'Egg Biryani', 'Fragrant rice with boiled eggs and aromatic spices', 180.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/egg-biryani-2145043_1280.jpg');

-- Insert menu items for Pizza Corner
INSERT INTO menu_items (restaurant_id, name, description, price, veg, image_url) VALUES
(4, 'Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella, and fresh basil', 250.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/pizza-2145033_1280.jpg'),
(4, 'Pepperoni Pizza', 'Pizza topped with spicy pepperoni and mozzarella cheese', 320.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/pepperoni-pizza-2145044_1280.jpg'),
(4, 'BBQ Chicken Pizza', 'Pizza with BBQ sauce, grilled chicken, and red onions', 380.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/bbq-chicken-pizza-2145045_1280.jpg'),
(4, 'Veg Supreme Pizza', 'Loaded with bell peppers, mushrooms, onions, and olives', 300.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/veg-supreme-pizza-2145046_1280.jpg');

-- Insert menu items for Sushi Express
INSERT INTO menu_items (restaurant_id, name, description, price, veg, image_url) VALUES
(5, 'California Roll', 'Crab, avocado, and cucumber wrapped in seaweed and rice', 180.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/sushi-2145034_1280.jpg'),
(5, 'Salmon Nigiri', 'Fresh salmon slices over seasoned rice', 220.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/salmon-nigiri-2145047_1280.jpg'),
(5, 'Vegetable Tempura', 'Assorted vegetables deep-fried in light batter', 160.00, TRUE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/vegetable-tempura-2145048_1280.jpg'),
(5, 'Chicken Teriyaki', 'Grilled chicken glazed with teriyaki sauce', 280.00, FALSE, 'https://cdn.pixabay.com/photo/2017/03/16/13/41/chicken-teriyaki-2145049_1280.jpg');
