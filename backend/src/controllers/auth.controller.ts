import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { loginsValidator } from "../validators/request.validators";

let authService = new AuthService();
export class AuthController {
  async loginUser(req: Request, res: Response) {
    try {

      let { error } = loginsValidator.validate(req.body);

      if (error) {
        return res.status(401).json({
          error: error.message
        })
      }

      let response = (await authService.loginUser(req.body));

      return res.status(201).json(response)
      
    } catch (error) {
      res.status(401).json({
        error: error
      })
    }
  }
}