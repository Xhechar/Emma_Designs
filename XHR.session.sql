use fashion

SELECT * FROM products

SELECT * FROM users

SELECT c.cart_id, c.product_id as cart_product_id, c.user_id, c.isPaid, c.itemsCount, p.product_id, p.name AS product_name, p.images, p.short_desc, p.long_desc, p.price, p.stock_quantity, p.cartegory, p.createdAt as product_createdAt, p.type, p.onOffer, p.discount, p.max_quantity, p.onFlush FROM cart c JOIN products p ON c.product_id = p.product_id

SELECT * FROM products WHERE createdAt <= DATEADD(MONTH,-6, GETDATE()) AND stock_quantity >= (80/100 * 100) and onFlush = 1