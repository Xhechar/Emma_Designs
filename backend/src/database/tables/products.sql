CREATE TABLE products (
  product_id VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  images NVARCHAR(MAX) NOT NULL,
  short_desc VARCHAR(255) NOT NULL,
  long_desc VARCHAR(255) NOT NULL,
  price INT DEFAULT 0,
  stock_quantity INT DEFAULT 0,
  cartegory VARCHAR(255) NOT NULL,
  createdAt DATE DEFAULT GETDATE()
)

SELECT * FROM products

ALTER TABLE products 
ADD type VARCHAR(255) DEFAULT 'New' NOT NULL

ALTER TABLE products
ADD onOffer BIT DEFAULT 0

ALTER TABLE products
ADD discount INT DEFAULT 0

ALTER TABLE products
ADD max_quantity INT DEFAULT 0