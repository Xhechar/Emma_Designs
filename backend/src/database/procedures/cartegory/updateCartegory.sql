CREATE OR ALTER PROCEDURE updateCartegory (
  @cartegory_id VARCHAR(255),
  @name VARCHAR(255)
)
AS 
BEGIN
  UPDATE cartegories SET cartegory_id = @cartegory_id, name = @name WHERE cartegory_id = @cartegory_id
END