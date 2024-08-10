use fashion

SELECT o.user_id as order_user_id, o.product_id as order_product_id,  o.order_id, o.createdAt AS order_createdAt, o.delivery, u.user_id, u.fullname, u.email, u.phone_number, u.gender, u.country, u.county, u.address, u.profile_image, u.role, u.password, u.createdAt, p.product_id, p.name AS product_name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt as product_createdAt, p.type FROM oders o JOIN users u ON o.user_id = u.user_id JOIN products p ON o.product_id = p.product_id WHERE u.isDeleted = 0
