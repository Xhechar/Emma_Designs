import { Router } from "express";
import { CartegoryController } from "../controllers/cartegory.controllers";
import { verifyAdmin, verifyToken } from "../middleware/verify.token";

const cartegoryRouter = Router();
const cartegoryController = new CartegoryController();

cartegoryRouter.post('/create-cartegory', verifyToken, verifyAdmin, cartegoryController.createCartegory);
cartegoryRouter.put('/update-cartegory/:cartegory_id', verifyToken, verifyAdmin, cartegoryController.updateCartegory);
cartegoryRouter.delete('/delete-cartegory/:cartegory_id', verifyToken, verifyAdmin, cartegoryController.deleteCartegory);
cartegoryRouter.get('/get-all-cartegories', verifyToken, cartegoryController.getAllCartegories);

export default cartegoryRouter;