CREATE OR ALTER PROCEDURE registerUser (
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
  INSERT INTO users (user_id, fullname, email, phone_number, gender, country, county, address,
  profile_image, password
  ) VALUES (@user_id, @fullname, @email, @phone_number, @gender, @country, @county, @address,
  @profile_image, @password)
END