CREATE OR ALTER PROCEDURE createReview (
  @review_id VARCHAR(255),
  @user_id VARCHAR(255),
  @product_id VARCHAR(255),
  @rating INT,
  @review VARCHAR(255)
)
AS 
BEGIN
  INSERT INTO reviews (review_id, user_id, product_id, rating, review) 
  VALUES (@review_id, @user_id, @product_id, @rating, @review)
END

ALTER TABLE reviews 
ADD createdAt DATE DEFAULT GETDATE()

SELECT * FROM reviews