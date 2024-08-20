CREATE OR ALTER PROCEDURE createOrder (
  @order_id VARCHAR(255),
  @user_id VARCHAR(255),
  @product_id VARCHAR(255),
  @itemsCount INT,
  @pricePaid INT
)
AS 
BEGIN
  INSERT INTO oders (order_id, user_id, product_id, itemsCount, pricePaid) 
  VALUES (@order_id, @user_id, @product_id, @itemsCount, @pricePaid)
END