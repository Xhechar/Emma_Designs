CREATE TABLE oders (
  order_id VARCHAR(255) PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  createdAt DATE DEFAULT GETDATE(),
  delivery VARCHAR(255) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

SELECT * FROM oders

ALTER TABLE oders
ADD isCanceled BIT DEFAULT 0

ALTER TABLE oders
ADD isDeleted BIT DEFAULT 0

ALTER TABLE oders
ADD itemsCount INT DEFAULT 0

ALTER TABLE oders
ADD pricePaid INT DEFAULT 0