import { NextFunction, Request, Response } from "express";
import { TokenInfo } from "../interfaces/fashion.interfaces";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface ExtendedRequest extends Request {
  info?: TokenInfo;
}
export const verifyToken = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    let authHeaders = req.headers['authorization'] as string;

    if (authHeaders === '') {
      return res.status(401).json({
        error: 'Action is not authorised'
      })
    }

    let token = authHeaders.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY as string, (err, data) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            error: 'Token provided has expired'
          });
        } else if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({
            error: 'The token provided is expired'
          });
        } else {
          return res.status(401).json({
            error: 'Unable to authorise token'
          });
        }
      }

      req.info = data as TokenInfo;
      next();
    })
  } catch (error) {
    return res.status(501).json({
      error: error
    })
  }
}

export const getUserIdFromToken = (req: ExtendedRequest):string => {
  let data = req.info as TokenInfo;

  if (!data) {
    return 'no data'
  } else {
    const user_id = data.user_id;

    return user_id;
  }
}

export const verifyAdmin = (req: ExtendedRequest, res: Response,next: NextFunction) => {
  const info = req.info as TokenInfo;

  if (!info) {
    return res.status(401).json({
      error: 'You are not authorised as admin to access this service'
    })
  } else {
    const role = info.role;

    if (role != 'admin') {
      return res.status(401).json({
        error: 'You cannot access this service, contact admin'
      })
    } else {
      next();
    }
  }
}