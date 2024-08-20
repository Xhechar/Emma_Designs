import { Router } from "express";
import { CartegoryController } from "../controllers/cartegory.controllers";

const cartegoryRouter = Router();
const cartegoryController = new CartegoryController();

cartegoryRouter.post('/create-cartegory', cartegoryController.createCartegory);
cartegoryRouter.post('/update-cartegory/:cartegory_id', cartegoryController.updateCartegory);
cartegoryRouter.delete('delete_cartegory/:cartegory_id', cartegoryController.deleteCartegory);
cartegoryRouter.get('/get-all-cartegories', cartegoryController.getAllCartegories);

export default cartegoryRouter;