CREATE TABLE cart (
  cart_id VARCHAR(255) PRIMARY KEY NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

SELECT * FROM cart

ALTER TABLE cart 
ADD isPaid BIT NOT NULL DEFAULT 0

ALTER TABLE cart 
ADD itemsCount INT NOT NULL DEFAULT 1