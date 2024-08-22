use fashion

SELECT * FROM products

SELECT * FROM oders

SELECT c.cart_id, c.product_id as cart_product_id, c.user_id, c.isPaid, c.itemsCount, p.product_id, p.name AS product_name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt as product_createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush FROM cart c JOIN products p ON c.product_id = p.product_id

SELECT * FROM products WHERE createdAt <= DATEADD(MONTH,-6, GETDATE()) AND stock_quantity >= (80/100 * 100) and onFlush = 1

select r.review_id, r.user_id, r.product_id as review_product_id, r.rating, r.review, r.createdAt as review_createdAt, r.updatedAt, p.product_id, p.name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush from reviews r join products p on r.product_id = p.product_id where r.product_id = '3a216f64-66d9-45a9-ad97-e318f87e8faa'