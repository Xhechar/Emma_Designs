CREATE TABLE reviews (
  review_id VARCHAR(255) PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  rating INT DEFAULT 0,
  review VARCHAR(255) NOT NULL,
  createdAt DATE DEFAULT GETDATE(),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

SELECT * FROM reviews

ALTER TABLE reviews 
ADD updatedAt VARCHAR(255) DEFAULT CAST (GETDATE() as VARCHAR);

DROP TABLE reviews