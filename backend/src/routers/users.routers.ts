import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middleware/verify.token";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/create-user', userController.createUser);
userRouter.post('/update-user', verifyToken, userController.updateUser);
userRouter.get('/get-all-users', verifyToken, verifyAdmin, userController.getAllUsers);
userRouter.delete('/delete-user/:user_id', verifyToken, verifyAdmin, userController.deleteUser);
userRouter.put('/soft-delete-user/:user_id', verifyToken, verifyAdmin, userController.softDeleteUser);
userRouter.get('/get-all-soft-deleted-users', verifyToken, verifyAdmin, userController.getAllSoftDeletedUsers);
userRouter.get('/get-single-user', verifyToken, userController.getUserById);
userRouter.get('/get-user-by-name', verifyToken, verifyAdmin, userController.getUserByName);
userRouter.get('/get-user-by-email', verifyToken, verifyAdmin, userController.getUserByEmail);
userRouter.put('/retrieve-deleted-user/:user_id', verifyToken, verifyAdmin, userController.retrieveDeletedUser);
userRouter.put('/retrieve-deleted-users', verifyToken, verifyAdmin, userController.retrieveDeletedUsers);

export default userRouter;