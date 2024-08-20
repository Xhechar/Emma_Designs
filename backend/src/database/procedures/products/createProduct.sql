CREATE OR ALTER PROCEDURE createProduct (
  @product_id VARCHAR(255),
  @name VARCHAR(255),
  @images NVARCHAR(MAX),
  @short_desc VARCHAR(255),
  @long_desc VARCHAR(255),
  @price INT,
  @stock_quantity INT,
  @cartegory VARCHAR(255),
  @type VARCHAR(255),
  @discount INT,
  @max_quantity INT
)
AS 
BEGIN
  INSERT INTO products (product_id, name, images, short_desc, long_desc, price, stock_quantity, cartegory, type, discount, max_quantity) 
  VALUES (@product_id, @name, @images, @short_desc, @long_desc, @price, @stock_quantity, @cartegory, @type, @discount, @max_quantity)
END