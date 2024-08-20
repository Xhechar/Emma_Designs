import { Request, Response } from "express";
import { userValidator } from "../validators/request.validators";
import { UserService } from "../services/user.service";
import { getUserIdFromToken } from "../middleware/verify.token";

const userService = new UserService();
export class UserController {
  async createUser(req: Request, res: Response) {
    try {

      let { error } = userValidator.validate(req.body);

      if (error) {
        return res.status(401).json({
          error: error.message
        })
      }

      let response = await userService.createUser(req.body);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {

      let { error } = userValidator.validate(req.body);

      if (error) {
        return res.status(401).json({
          error: error.message
        })
      }

      console.log(getUserIdFromToken(req));

      let response = await userService.updateUser(getUserIdFromToken(req), req.body);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {

      let response = await userService.getAllUsers();

      return res.status(201).json(response)
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {

      let response = await userService.deleteUser(req.params.user_id);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async softDeleteUser(req: Request, res: Response) {
    try {

      let response = await userService.softDeleteUser(req.params.user_id);

      return res.status(201).json(response);
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getAllSoftDeletedUsers(req: Request, res: Response) {
    try {

      let response = await userService.getAllSoftDeletedUsers();

      return res.status(201).json(response)
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getUserById(req: Request, res: Response) {
    try {

      let response = await userService.getUserById(getUserIdFromToken(req));

      return res.status(201).json(response)
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getUserByName(req: Request, res: Response) {
    try {

      let response = await userService.getUserByName(req.body);

      return res.status(201).json(response)
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {

      let response = await userService.getUserByEmail(req.body);

      return res.status(201).json(response)
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async retrieveDeletedUser(req: Request, res: Response) {
    try {

      let response = await userService.retrieveDeletedUser(req.params.user_id);

      return res.status(201).json(response)
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }

  async retrieveDeletedUsers(req: Request, res: Response) {
    try {

      let response = await userService.retrieveDeletedUsers();

      return res.status(201).json(response)
      
    } catch (error) {
      return res.status(501).json({
        error: error
      })
    }
  }
}