CREATE OR ALTER PROCEDURE createCart (
  @cart_id VARCHAR(255),
  @user_id VARCHAR(255),
  @product_id VARCHAR(255),
  @itemsCount INT
)
AS 
BEGIN
  INSERT INTO cart (cart_id, user_id, product_id, itemsCount) 
  VALUES (@cart_id, @user_id, @product_id, @itemsCount)
END