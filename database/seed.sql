BEGIN;

-- Insert values into groups
INSERT INTO groups (name) VALUES
  ('Electronics'),
  ('Clothing'),
  ('Books'),
  ('Toys'),
  ('Home Appliances'),
  ('Sports Equipment'),
  ('Furniture'),
  ('Beauty Products'),
  ('Groceries'),
  ('Automotive'),
  ('Garden Supplies'),
  ('Office Supplies'),
  ('Musical Instruments'),
  ('Pet Supplies'),
  ('Health Products'),
  ('Movies'),
  ('Music'),
  ('Video Games'),
  ('Tools'),
  ('Cleaning Supplies'),
  ('Baby Products'),
  ('Jewelry'),
  ('Watches'),
  ('Bags'),
  ('Shoes'),
  ('Kitchen Appliances'),
  ('Lighting'),
  ('Outdoor Gear'),
  ('Art Supplies'),
  ('Stationery')
ON CONFLICT DO NOTHING;

-- Insert values into categories
INSERT INTO categories (name, group_id) VALUES
  ('Smartphones', 1),
  ('Laptops', 1),
  ('Men Wear', 2),
  ('Women Wear', 2),
  ('Fiction', 3),
  ('Non-Fiction', 3),
  ('Action Figures', 4),
  ('Board Games', 4),
  ('Refrigerators', 5),
  ('Microwaves', 5),
  ('Bicycles', 6),
  ('Treadmills', 6),
  ('Sofas', 7),
  ('Beds', 7),
  ('Makeup', 8),
  ('Skincare', 8),
  ('Vegetables', 9),
  ('Fruits', 9),
  ('Car Accessories', 10),
  ('Motorcycles', 10),
  ('Plants', 11),
  ('Gardening Tools', 11),
  ('Paper', 12),
  ('Pens', 12),
  ('Guitars', 13),
  ('Drums', 13),
  ('Dog Food', 14),
  ('Cat Food', 14),
  ('Vitamins', 15),
  ('Medicines', 15)
ON CONFLICT DO NOTHING;

-- Insert values into products with Picsum URLs
INSERT INTO products (name, description, image_path, stock, category_id, price, size, color, genre) VALUES
  ('iPhone 13', 'Latest Apple smartphone', 'https://picsum.photos/200', 50, 1, 999.99, 'N/A', 'Black', 'N/A'),
  ('MacBook Pro', 'High performance laptop', 'https://picsum.photos/200', 30, 2, 1999.99, '15 inch', 'Silver', 'N/A'),
  ('Men T-Shirt', 'Comfortable cotton t-shirt', 'https://picsum.photos/200', 100, 3, 19.99, 'L', 'Blue', 'N/A'),
  ('Women Dress', 'Elegant evening dress', 'https://picsum.photos/200', 40, 4, 79.99, 'M', 'Red', 'N/A'),
  ('The Great Gatsby', 'Classic novel by F. Scott Fitzgerald', 'https://picsum.photos/200', 200, 5, 10.99, 'N/A', 'N/A', 'Fiction'),
  ('Samsung Galaxy S21', 'New generation Samsung smartphone', 'https://picsum.photos/200', 60, 1, 899.99, 'N/A', 'White', 'N/A'),
  ('Dell XPS 13', 'Ultra portable laptop', 'https://picsum.photos/200', 25, 2, 1399.99, '13 inch', 'Black', 'N/A'),
  ('Women Jeans', 'Stylish and comfortable', 'https://picsum.photos/200', 70, 4, 49.99, 'M', 'Blue', 'N/A'),
  ('Apple iPad', 'Latest model', 'https://picsum.photos/200', 80, 1, 799.99, '10 inch', 'Space Gray', 'N/A'),
  ('Sony WH-1000XM4', 'Noise cancelling headphones', 'https://picsum.photos/200', 90, 1, 349.99, 'N/A', 'Black', 'N/A'),
  ('Nike Running Shoes', 'Comfortable running shoes', 'https://picsum.photos/200', 120, 3, 69.99, '10', 'Red', 'N/A'),
  ('LG OLED TV', 'High quality OLED TV', 'https://picsum.photos/200', 15, 1, 2999.99, '55 inch', 'Black', 'N/A'),
  ('Adidas Jacket', 'Warm and stylish jacket', 'https://picsum.photos/200', 50, 3, 99.99, 'L', 'Green', 'N/A'),
  ('KitchenAid Mixer', 'High performance mixer', 'https://picsum.photos/200', 30, 5, 199.99, 'N/A', 'Red', 'N/A'),
  ('Bose SoundLink', 'Portable Bluetooth speaker', 'https://picsum.photos/200', 45, 1, 129.99, 'N/A', 'Black', 'N/A'),
  ('Canon EOS R', 'High quality mirrorless camera', 'https://picsum.photos/200', 20, 1, 2499.99, 'N/A', 'Black', 'N/A'),
  ('Nest Thermostat', 'Smart thermostat', 'https://picsum.photos/200', 35, 1, 249.99, 'N/A', 'White', 'N/A'),
  ('Samsung Fridge', 'Large capacity refrigerator', 'https://picsum.photos/200', 25, 9, 1499.99, 'N/A', 'Silver', 'N/A'),
  ('Bosch Dishwasher', 'Efficient and quiet', 'https://picsum.photos/200', 20, 9, 799.99, 'N/A', 'White', 'N/A'),
  ('Dyson Vacuum', 'Powerful vacuum cleaner', 'https://picsum.photos/200', 40, 9, 499.99, 'N/A', 'Silver', 'N/A'),
  ('Asus ROG Laptop', 'Gaming laptop with high specs', 'https://picsum.photos/200', 10, 2, 1599.99, '17 inch', 'Black', 'N/A'),
  ('HP OfficeJet Printer', 'All-in-one printer', 'https://picsum.photos/200', 60, 1, 229.99, 'N/A', 'White', 'N/A'),
  ('Sony PlayStation 5', 'Next-gen gaming console', 'https://picsum.photos/200', 100, 18, 499.99, 'N/A', 'White', 'N/A'),
  ('Xbox Series X', 'Microsoft gaming console', 'https://picsum.photos/200', 90, 18, 499.99, 'N/A', 'Black', 'N/A'),
  ('Nintendo Switch', 'Portable gaming console', 'https://picsum.photos/200', 110, 18, 299.99, 'N/A', 'Red/Blue', 'N/A'),
  ('Logitech Mouse', 'Wireless computer mouse', 'https://picsum.photos/200', 150, 1, 29.99, 'N/A', 'Black', 'N/A'),
  ('Amazon Echo', 'Smart speaker with Alexa', 'https://picsum.photos/200', 80, 1, 99.99, 'N/A', 'Black', 'N/A'),
  ('Fitbit Charge 4', 'Fitness tracker with GPS', 'https://picsum.photos/200', 70, 1, 129.99, 'N/A', 'Black', 'N/A'),
  ('Roku Streaming Stick', 'HD streaming device', 'https://picsum.photos/200', 60, 1, 49.99, 'N/A', 'Black', 'N/A'),
  ('Google Nest Hub', 'Smart display with Google Assistant', 'https://picsum.photos/200', 50, 1, 99.99, 'N/A', 'White', 'N/A')
ON CONFLICT DO NOTHING;

-- Insert values into users
INSERT INTO users (name, username, password, address, image_path, email) VALUES
  ('John Doe', 'johndoe', 'password123', '123 Main St', 'path/to/user1.jpg', 'johndoe@example.com'),
  ('Jane Smith', 'janesmith', 'password123', '456 Elm St', 'path/to/user2.jpg', 'janesmith@example.com'),
  ('Alice Johnson', 'alicej', 'password123', '789 Oak St', 'path/to/user3.jpg', 'alicej@example.com'),
  ('Bob Brown', 'bobbrown', 'password123', '101 Pine St', 'path/to/user4.jpg', 'bobbrown@example.com'),
  ('Charlie Davis', 'charlied', 'password123', '202 Birch St', 'path/to/user5.jpg', 'charlied@example.com'),
  ('David Evans', 'davide', 'password123', '303 Maple St', 'path/to/user6.jpg', 'davide@example.com'),
  ('Eva Green', 'evagreen', 'password123', '404 Cedar St', 'path/to/user7.jpg', 'evagreen@example.com'),
  ('Frank Harris', 'frankh', 'password123', '505 Walnut St', 'path/to/user8.jpg', 'frankh@example.com'),
  ('Grace Lee', 'gracelee', 'password123', '606 Chestnut St', 'path/to/user9.jpg', 'gracelee@example.com'),
  ('Henry Miller', 'henrym', 'password123', '707 Ash St', 'path/to/user10.jpg', 'henrym@example.com'),
  ('Ivy Nelson', 'ivyn', 'password123', '808 Birch St', 'path/to/user11.jpg', 'ivyn@example.com'),
  ('Jack Owens', 'jacko', 'password123', '909 Pine St', 'path/to/user12.jpg', 'jacko@example.com'),
  ('Karen Perez', 'karenp', 'password123', '1010 Elm St', 'path/to/user13.jpg', 'karenp@example.com'),
  ('Leo Quinn', 'leoq', 'password123', '1111 Maple St', 'path/to/user14.jpg', 'leoq@example.com'),
  ('Mia Rodriguez', 'miar', 'password123', '1212 Oak St', 'path/to/user15.jpg', 'miar@example.com'),
  ('Nina Scott', 'ninas', 'password123', '1313 Cedar St', 'path/to/user16.jpg', 'ninas@example.com'),
  ('Oliver Turner', 'olivert', 'password123', '1414 Walnut St', 'path/to/user17.jpg', 'olivert@example.com'),
  ('Paulina Walker', 'paulinaw', 'password123', '1515 Chestnut St', 'path/to/user18.jpg', 'paulinaw@example.com'),
  ('Quincy Young', 'quincy', 'password123', '1616 Ash St', 'path/to/user19.jpg', 'quincy@example.com'),
  ('Rachel Zane', 'rachelz', 'password123', '1717 Birch St', 'path/to/user20.jpg', 'rachelz@example.com'),
  ('Sam Adams', 'sama', 'password123', '1818 Pine St', 'path/to/user21.jpg', 'sama@example.com'),
  ('Tina Bell', 'tinab', 'password123', '1919 Elm St', 'path/to/user22.jpg', 'tinab@example.com'),
  ('Uma Carter', 'umac', 'password123', '2020 Maple St', 'path/to/user23.jpg', 'umac@example.com'),
  ('Victor Diaz', 'victord', 'password123', '2121 Oak St', 'path/to/user24.jpg', 'victord@example.com'),
  ('Wendy Edwards', 'wendye', 'password123', '2222 Cedar St', 'path/to/user25.jpg', 'wendye@example.com'),
  ('Xander Fox', 'xanderf', 'password123', '2323 Walnut St', 'path/to/user26.jpg', 'xanderf@example.com'),
  ('Yara Gomez', 'yarag', 'password123', '2424 Chestnut St', 'path/to/user27.jpg', 'yarag@example.com'),
  ('Zach Hunter', 'zachh', 'password123', '2525 Ash St', 'path/to/user28.jpg', 'zachh@example.com'),
  ('Amy Johnson', 'amyj', 'password123', '2626 Birch St', 'path/to/user29.jpg', 'amyj@example.com'),
  ('Brian King', 'briank', 'password123', '2727 Pine St', 'path/to/user30.jpg', 'briank@example.com')
ON CONFLICT DO NOTHING;

-- Insert values into reviews
INSERT INTO reviews (name, description, image_path, score, product_id, user_id) VALUES
  ('Great Phone', 'Love the new features', 'path/to/review1.jpg', 5, 1, 1),
  ('Amazing Laptop', 'Best laptop I have used', 'path/to/review2.jpg', 5, 2, 2),
  ('Good T-Shirt', 'Very comfortable', 'path/to/review3.jpg', 4, 3, 3),
  ('Beautiful Dress', 'Fits perfectly', 'path/to/review4.jpg', 5, 4, 4),
  ('Classic Read', 'Timeless novel', 'path/to/review5.jpg', 5, 5, 5),
  ('Excellent Camera', 'High quality photos', 'path/to/review6.jpg', 5, 16, 6),
  ('Great Sound', 'Amazing audio quality', 'path/to/review7.jpg', 5, 15, 7),
  ('Very Comfortable', 'Best running shoes I have worn', 'path/to/review8.jpg', 5, 11, 8),
  ('Highly Recommend', 'Great smart speaker', 'path/to/review9.jpg', 5, 27, 9),
  ('Powerful Performance', 'High performance laptop', 'path/to/review10.jpg', 5, 7, 10),
  ('Great Picture Quality', 'Amazing TV', 'path/to/review11.jpg', 5, 12, 11),
  ('Very Useful', 'Great for cooking', 'path/to/review12.jpg', 5, 14, 12),
  ('Great Gaming Console', 'Love playing on this', 'path/to/review13.jpg', 5, 23, 13),
  ('Awesome Design', 'Looks great in my living room', 'path/to/review14.jpg', 5, 13, 14),
  ('Good Sound', 'Clear and crisp audio', 'path/to/review15.jpg', 5, 15, 15),
  ('Great Fit', 'Perfect size for me', 'path/to/review16.jpg', 5, 8, 16),
  ('Fast and Efficient', 'Cleans dishes quickly', 'path/to/review17.jpg', 5, 19, 17),
  ('Very Convenient', 'Helps me stay fit', 'path/to/review18.jpg', 5, 28, 18),
  ('Fantastic Gaming', 'Great experience', 'path/to/review19.jpg', 5, 25, 19),
  ('High Quality', 'Great build quality', 'path/to/review20.jpg', 5, 20, 20),
  ('Great Buy', 'Excellent value for money', 'path/to/review21.jpg', 5, 21, 21),
  ('Highly Recommend', 'Would buy again', 'path/to/review22.jpg', 5, 22, 22),
  ('Perfect Size', 'Fits perfectly in my kitchen', 'path/to/review23.jpg', 5, 18, 23),
  ('Amazing Device', 'Very smart and useful', 'path/to/review24.jpg', 5, 17, 24),
  ('Great Sound', 'Love the audio quality', 'path/to/review25.jpg', 5, 15, 25),
  ('Highly Functional', 'Does everything I need', 'path/to/review26.jpg', 5, 22, 26),
  ('Excellent Value', 'Worth every penny', 'path/to/review27.jpg', 5, 27, 27),
  ('Great Product', 'Very satisfied', 'path/to/review28.jpg', 5, 30, 28),
  ('Awesome Performance', 'Very powerful', 'path/to/review29.jpg', 5, 24, 29),
  ('Highly Recommend', 'Amazing laptop', 'path/to/review30.jpg', 5, 7, 30)
ON CONFLICT DO NOTHING;

-- Insert values into carts
INSERT INTO carts (user_id) VALUES
  (1),
  (2),
  (3),
  (4),
  (5),
  (6),
  (7),
  (8),
  (9),
  (10),
  (11),
  (12),
  (13),
  (14),
  (15),
  (16),
  (17),
  (18),
  (19),
  (20),
  (21),
  (22),
  (23),
  (24),
  (25),
  (26),
  (27),
  (28),
  (29),
  (30)
ON CONFLICT DO NOTHING;

-- Insert values into products_carts
INSERT INTO products_carts (cart_id, products_id) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (3, 4),
  (4, 5),
  (5, 6),
  (6, 7),
  (7, 8),
  (8, 9),
  (9, 10),
  (10, 11),
  (11, 12),
  (12, 13),
  (13, 14),
  (14, 15),
  (15, 16),
  (16, 17),
  (17, 18),
  (18, 19),
  (19, 20),
  (20, 21),
  (21, 22),
  (22, 23),
  (23, 24),
  (24, 25),
  (25, 26),
  (26, 27),
  (27, 28),
  (28, 29),
  (29, 30)
ON CONFLICT DO NOTHING;

-- Insert values into sessions
INSERT INTO sessions (user_id) VALUES
  (1),
  (2),
  (3),
  (4),
  (5),
  (6),
  (7),
  (8),
  (9),
  (10),
  (11),
  (12),
  (13),
  (14),
  (15),
  (16),
  (17),
  (18),
  (19),
  (20),
  (21),
  (22),
  (23),
  (24),
  (25),
  (26),
  (27),
  (28),
  (29),
  (30)
ON CONFLICT DO NOTHING;

COMMIT;
