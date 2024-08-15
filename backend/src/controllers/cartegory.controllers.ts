import { Request, Response } from "express";
import { CartegoriesService } from "../services/cartegories";

const cartegoryService = new CartegoriesService();
export class CartegoryController {
  async createCartegory(req: Request, res: Response) {
    try {
      let response = await cartegoryService.createCartegory(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async updateCartegory(req: Request, res: Response) {
    try {
      let response = await cartegoryService.updateCartegory(req.params.cartegory_id, req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getAllCartegories(req: Request, res: Response) {
    try {
      let response = await cartegoryService.getAllCartegories();

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async deleteCartegory(req: Request, res: Response) {
    try {
      let response = await cartegoryService.deleteCartegory(req.params.cartegory_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }
}