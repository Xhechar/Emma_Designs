CREATE OR ALTER PROCEDURE updateReview (
  @review_id VARCHAR(255),
  @user_id VARCHAR(255),
  @product_id VARCHAR(255),
  @rating INT,
  @review VARCHAR(255)
)
AS
BEGIN
  UPDATE reviews SET review_id = @review_id, user_id = @user_id, product_id = @product_id, rating = @rating, review = @review WHERE review_id = @review_id
END