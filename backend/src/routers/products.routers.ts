import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middleware/verify.token";
import { ProductController } from "../controllers/product.controllers";

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/create-product',verifyToken, verifyAdmin, productController.createProduct);
productRouter.post('/update-product/:product_id', verifyToken, verifyAdmin, productController.updateProduct);
productRouter.get('/get-product-by-id/:product_id', verifyToken, verifyAdmin, productController.getProductByProductId);
productRouter.get('/get-product-by-name', verifyToken, verifyAdmin, productController.getProductByName);
productRouter.get('/get-product-by-cartegory', verifyToken, verifyAdmin, productController.getProductByCartegory);
productRouter.get('/get-all-products', productController.getAllProduct);
productRouter.get('/get-flush-products', verifyToken, verifyAdmin, productController.getFlushProducts);
productRouter.get('/get-offered-products', verifyToken, verifyAdmin, productController.getOfferredProducts);
productRouter.put('/set-offer-to-product/:product_id', verifyToken, verifyAdmin, productController.setOffer);
productRouter.put('/remove-offer/:product_id', verifyToken, verifyAdmin, productController.removeFromOffers);
productRouter.put('/set-flush-product/:product_id', verifyToken, verifyAdmin, productController.setFlushProducts);
productRouter.put('/reset-flush-product/:product_id', verifyToken, verifyAdmin, productController.resetFlushProducts);
productRouter.delete('/delete-product/:product_id', verifyToken, verifyAdmin, productController.deleteProduct);

export default productRouter;