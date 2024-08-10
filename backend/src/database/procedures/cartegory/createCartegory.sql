CREATE OR ALTER PROCEDURE createCartegory (
  @cartegory_id VARCHAR(255),
  @name VARCHAR(255)
)
AS 
BEGIN
  INSERT INTO cartegories (cartegory_id, name) 
  VALUES (@cartegory_id, @name)
END