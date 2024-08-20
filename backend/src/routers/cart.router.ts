import { Router } from "express";
import { CartConroller } from "../controllers/cart.controller";
import { verifyToken } from "../middleware/verify.token";

const cartRouter = Router();
const cartConroller = new CartConroller();

cartRouter.post('/create-cart', verifyToken, cartConroller.createCart);
cartRouter.post('/update-cart/:cart_id', verifyToken, cartConroller.updateCartItem);
cartRouter.delete('/delete_item/:cart_id', verifyToken, cartConroller.removeItemFromCart);
cartRouter.delete('/clear-cart', verifyToken, cartConroller.clearCart);
cartRouter.get('/get-cart-items', verifyToken, cartConroller.getCartItemsByUser);

export default cartRouter;