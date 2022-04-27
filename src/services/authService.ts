
import { compareHash } from '../../utils/auth/hash/hash';
import boom from '@hapi/boom';
import UserService from './usersService';
import { IUser } from '../models/userInterface';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import IAuthService from '../models/authInterface';
import { User } from '@prisma/client';
import argon2 from 'argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userService = new UserService()

const jwtConfig = {
  expiresIn:'5d'
}

class AuthService implements IAuthService{
  async signUp(body: IUser)  {
    const hash:string = await argon2.hash(body.password as string, {type: argon2.argon2id});
    const newUser = <IUser> await prisma.user.create({
      data: {
        ...body,
        role:body.role || "user",
        password:hash
      }
    });
    return newUser;
  }
  async getUser(email:string, password:string) {
    const user = <IUser> await userService.getUserByEmail(email);
    if (!user) {
      throw boom.unauthorized("Your crendentials are bad.");
    }
    const isMatch:boolean = await compareHash(user.password, password);
    if (!isMatch) {
      throw boom.unauthorized("Your crendentials are bad.");
    }
    return user;
  }

  signToken(user:IUser):string {
      const payload = {
        sub: user.userId,
        role: user.role
      }
      const token = jwt.sign(payload, String(config.jwtSecret), jwtConfig);
      return token;
  }
}

export default AuthService;
