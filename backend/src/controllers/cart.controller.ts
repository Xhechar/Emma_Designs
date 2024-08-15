import { Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { getUserIdFromToken } from "../middleware/verify.token";

const cartService = new CartService();
export class CartConroller {
  async createCart(req: Request, res: Response) {
    try {
      let response = await cartService.createCart(req.params.user_id, req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async updateCartItem(req: Request, res: Response) {
    try {

      let response = await cartService.updateCartItem(getUserIdFromToken(req), req.params.cart_id, req.body);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async removeItemFromCart(req: Request, res: Response) {
    try {

      let response = await cartService.removeItemFromCart(req.params.cart_id);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async clearCart(req: Request, res: Response) {
    try {

      let response = await cartService.clearCart(req.params.user_id);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getCartItemsByUser(req: Request, res: Response) {
    try {

      let response = await cartService.getCartItemsByUser(req.params.user_id);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }
}