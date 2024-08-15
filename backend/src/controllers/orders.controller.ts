import { Request, Response } from "express";
import { OrderService } from "../services/oders";

const orderService = new OrderService();
export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      let response = await orderService.createOrder(req.params.user_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async updateDeliveryStatus(req: Request, res: Response) {
    try {
      let response = await orderService.updateDeliveryStatus(req.params.order_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async updateMultipleDeliveryStatus(req: Request, res: Response) {
    try {
      let response = await orderService.updateMultipleDeliveryStatus(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async updateAllDeliveryStatus(req: Request, res: Response) {
    try {
      let response = await orderService.updateAllDeliveryStatus();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async softDeleteOrder(req: Request, res: Response) {
    try {
      let response = await orderService.softDeleteOrder(req.params.order_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async softDeleteAllOrders(req: Request, res: Response) {
    try {
      let response = await orderService.softDeleteAllOrders();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async restoreSingleOrder(req: Request, res: Response) {
    try {
      let response = await orderService.restoreSingleOrder(req.params.order_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async restoreAllOrders(req: Request, res: Response) {
    try {
      let response = await orderService.restoreAllOrders();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getAllSoftDeletedOrders(req: Request, res: Response) {
    try {
      let response = await orderService.getAllSoftDeletedOrders();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      let response = await orderService.getAllOrders();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getAllOrdersByUserId(req: Request, res: Response) {
    try {
      let response = await orderService.getAllOrdersByUserId(req.params.user_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      let response = await orderService.deleteOrder(req.params.order_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }
}