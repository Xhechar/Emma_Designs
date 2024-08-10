CREATE OR ALTER PROCEDURE updateOrder (
  @order_id VARCHAR(255),
  @user_id VARCHAR(255),
  @product_id VARCHAR(255),
  @delivery VARCHAR(255)
)
AS 
BEGIN
  UPDATE orders SET order_id = @order_id, user_id = @user_id, product_id = @product_id, delivery = @delivery WHERE order_id = @order_id
END