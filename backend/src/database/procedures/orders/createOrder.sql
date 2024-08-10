CREATE OR ALTER PROCEDURE createOrder (
  @order_id VARCHAR(255),
  @user_id VARCHAR(255),
  @product_id VARCHAR(255)
)
AS 
BEGIN
  INSERT INTO orders (order_id, user_id, product_id) 
  VALUES (@order_id, @user_id, @product_id)
END