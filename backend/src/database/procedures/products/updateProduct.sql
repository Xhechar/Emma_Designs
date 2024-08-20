CREATE OR ALTER PROCEDURE updateProduct (
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
  UPDATE products SET product_id = @product_id, name = @name, images = @images, short_desc = @short_desc, long_desc = @long_desc, price = @price, stock_quantity = @stock_quantity, cartegory = @cartegory, type = @type, discount = @discount, max_quantity = @max_quantity WHERE product_id = @product_id
END