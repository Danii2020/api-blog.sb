import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/authService';
import { IUser } from '../models/interfaces';



class AuthController {
  public static async login(req:Request, res:Response, next:NextFunction) {
    try {
      const user = <IUser> req.user;
      res.json(AuthService.signToken(user));
    } catch (error) {
      next(error);
    }
  }

}

export default AuthController;
