import { Request, Response } from "express";

export class AuthController {
  async loginUser(req: Request, res: Response) {
    try {
      
    } catch (error) {
      res.status(401).json({
        error: error
      })
    }
  }
}