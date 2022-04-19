import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/authService';
import { IUser } from '../models/interfaces';
import { PrismaClient } from '@prisma/client';
import boom from '@hapi/boom';
import argon2 from 'argon2';

const prisma = new PrismaClient();

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
      const hash = await argon2.hash(req.body.password, {type: argon2.argon2id});

      const newUser = <IUser> await prisma.user.create({
        data: {
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          username:req.body.username,
          email:req.body.email,
          password:hash,
          role:req.body.role || 'user',
          posts:req.body.post
        }
      });

      delete newUser.password;
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
      res.json(AuthService.signToken(user));
    } catch (error) {
      next(error);
    }
  }

}

export default AuthController;
