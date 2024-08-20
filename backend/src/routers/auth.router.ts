import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

let authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', authController.loginUser);

export default authRouter;