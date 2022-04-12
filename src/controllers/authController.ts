import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { signToken, verifyToken } from '../../utils/auth/token/token';
import boom from '@hapi/boom';
import argon2 from 'argon2';
import { IUser } from '../models/interfaces';
import { config } from '../../config/config';

const prisma = new PrismaClient();
const jwtConfig = {
  expiresIn:'5d';
}

class AuthController {
  public static async login(req:Request, res:Response, next:NextFunction) {
    try {
      const user:IUser = req.user;
      const payload = {
        sub: user.userId,
        role: user.role
      }
      const token = signToken(payload, config.jwtSecret, jwtConfig);
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
