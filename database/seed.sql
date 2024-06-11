BEGIN;

-- Insert values into groups
INSERT INTO groups (name) VALUES
  ('Electronics'),
  ('Clothing'),
  ('Books'),
  ('Toys'),
  ('Home Appliances')
ON CONFLICT DO NOTHING;

-- Insert values into categories
INSERT INTO categories (name, group_id) VALUES
  ('Smartphones', 1),
  ('Laptops', 1),
  ('Men\'s Wear', 2),
  ('Women\'s Wear', 2),
  ('Fiction', 3)
ON CONFLICT DO NOTHING;

-- Insert values into products
INSERT INTO products (name, description, image_path, stock, category_id, price, size, color, genre) VALUES
  ('iPhone 13', 'Latest Apple smartphone', 'path/to/image1.jpg', 50, 1, 999.99, 'N/A', 'Black', 'N/A'),
  ('MacBook Pro', 'High performance laptop', 'path/to/image2.jpg', 30, 2, 1999.99, '15 inch', 'Silver', 'N/A'),
  ('Men\'s T-Shirt', 'Comfortable cotton t-shirt', 'path/to/image3.jpg', 100, 3, 19.99, 'L', 'Blue', 'N/A'),
  ('Women\'s Dress', 'Elegant evening dress', 'path/to/image4.jpg', 40, 4, 79.99, 'M', 'Red', 'N/A'),
  ('The Great Gatsby', 'Classic novel by F. Scott Fitzgerald', 'path/to/image5.jpg', 200, 5, 10.99, 'N/A', 'N/A', 'Fiction')
ON CONFLICT DO NOTHING;

-- Insert values into users
INSERT INTO users (name, username, password, address, image_path) VALUES
  ('John Doe', 'johndoe', 'password123', '123 Main St', 'path/to/user1.jpg'),
  ('Jane Smith', 'janesmith', 'password123', '456 Elm St', 'path/to/user2.jpg'),
  ('Alice Johnson', 'alicej', 'password123', '789 Oak St', 'path/to/user3.jpg'),
  ('Bob Brown', 'bobbrown', 'password123', '101 Pine St', 'path/to/user4.jpg'),
  ('Charlie Davis', 'charlied', 'password123', '202 Birch St', 'path/to/user5.jpg')
ON CONFLICT DO NOTHING;

-- Insert values into reviews
INSERT INTO reviews (name, description, image_path, score, product_id, user_id) VALUES
  ('Great Phone', 'Love the new features', 'path/to/review1.jpg', 5, 1, 1),
  ('Amazing Laptop', 'Best laptop I have used', 'path/to/review2.jpg', 5, 2, 2),
  ('Good T-Shirt', 'Very comfortable', 'path/to/review3.jpg', 4, 3, 3),
  ('Beautiful Dress', 'Fits perfectly', 'path/to/review4.jpg', 5, 4, 4),
  ('Classic Read', 'Timeless novel', 'path/to/review5.jpg', 5, 5, 5)
ON CONFLICT DO NOTHING;

-- Insert values into carts
INSERT INTO carts (user_id) VALUES
  (1),
  (2),
  (3),
  (4),
  (5)
ON CONFLICT DO NOTHING;

-- Insert values into products_carts
INSERT INTO products_carts (cart_id, products_id) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (3, 4),
  (4, 5)
ON CONFLICT DO NOTHING;

-- Insert values into sessions
INSERT INTO sessions (user_id) VALUES
  (1),
  (2),
  (3),
  (4),
  (5)
ON CONFLICT DO NOTHING;

COMMIT;
