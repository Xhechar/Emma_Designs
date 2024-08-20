import { Router } from "express";
import { OrderController } from "../controllers/orders.controller";
import { verifyAdmin, verifyToken } from "../middleware/verify.token";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post('/create-order',verifyToken, orderController.createOrder);
orderRouter.put('/update-delivery-status/:order_id', verifyToken, verifyAdmin, orderController.updateDeliveryStatus);
orderRouter.put('/update-multiple-delivery-status', verifyToken, verifyAdmin, orderController.updateMultipleDeliveryStatus);
orderRouter.put('/update-all-delivery-status', verifyToken, verifyAdmin, orderController.updateAllDeliveryStatus);
orderRouter.put('/soft-delete-order/:order_id', verifyToken, verifyAdmin, orderController.softDeleteOrder);
orderRouter.put('/soft-delete-all-orders', verifyToken, verifyAdmin, orderController.softDeleteAllOrders);
orderRouter.put('/restore-single-order/:order_id', verifyToken, verifyAdmin, orderController.restoreSingleOrder);
orderRouter.put('/restore-all-orders', verifyToken, verifyAdmin, orderController.restoreAllOrders);
orderRouter.get('/get-all-soft-deleted-orders', verifyToken, verifyAdmin, orderController.getAllSoftDeletedOrders);
orderRouter.get('/get-all-orders', verifyToken, verifyAdmin, orderController.getAllOrders);
orderRouter.get('/get-all-orders-by-user-id/:user_id', verifyToken, orderController.getAllOrdersByUserId);
orderRouter.get('/delete-order/:order_id', verifyToken, verifyAdmin, orderController.deleteOrder);

export default orderRouter;