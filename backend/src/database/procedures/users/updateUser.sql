CREATE OR ALTER PROCEDURE updateUser (
  @user_id VARCHAR(255),
  @fullname VARCHAR(255),
  @email VARCHAR(255),
  @phone_number VARCHAR(255),
  @gender VARCHAR(255),
  @country VARCHAR(255),
  @county VARCHAR(255),
  @address VARCHAR(255),
  @profile_image VARCHAR(255),
  @password VARCHAR(255)
)
AS 
BEGIN
  UPDATE users SET user_id = @user_id, fullname = @fullname, email = @email, phone_number = @phone_number, gender = @gender,  country = @country, county = @county, address = @address,
  profile_image = @profile_image, password = @password WHERE user_id = @user_id
END