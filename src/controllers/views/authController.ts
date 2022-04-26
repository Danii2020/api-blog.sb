import { NextFunction, Request, Response } from 'express';
import AuthService from './../../services/authService';
import { IUser } from '../../models/userInterface';
import boom from '@hapi/boom';

const authService = new AuthService()

class AuthController {
  public static async getSignUp(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      res.render("auth/signup");
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"))
    }
  }

  public static async getLogin(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      res.render("auth/login");
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"))
    }
  }

  public static async signUp(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const body = req.body;
      const newUser = await authService.signUp(body);
      return res.redirect('/view/auth/login');
    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }

  public static async login(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const user = <IUser> req.user;
      const token:string = authService.signToken(user);
      res
        .cookie('jwt',token, {
          httpOnly:true,
          secure:true
        })
        .redirect("/view/profile/");
    } catch (error) {
      next(boom.internal("Server error"));
    }
  }

  public static async getLogout(req:Request, res:Response):Promise<any> {
    try {
      res.status(200).clearCookie("jwt", {
        path:"/"
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      boom.internal("Server error");
    }
  }

}

export default AuthController;
