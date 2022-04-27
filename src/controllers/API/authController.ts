import { NextFunction, Request, Response } from 'express';
import AuthService from './../../services/authService';
import { IUser } from '../../models/userInterface';
import boom from '@hapi/boom';
const authService = new AuthService()

class AuthController {
  public static async signUp(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const body = req.body;
      const newUser = await authService.signUp(body);
      return res.status(200).json({
        message:"User created",
        data:newUser
      });
    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }

  public static async login(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const user = <IUser> req.user;
      const token:string = authService.signToken(user);
      res.status(200).cookie('jwt',token, {
        httpOnly:true,
        secure:true
      }).json({
        data:user,
        token:token
      });
      delete user.password;
    } catch (error) {
      next(boom.internal("Server error"));
    }
  }
}

export default AuthController;
