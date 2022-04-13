
import { compareHash } from '../../utils/auth/hash/hash';
import boom from '@hapi/boom';
import UserService from './usersService';
import { IUser } from '../models/interfaces';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

const jwtConfig = {
  expiresIn:'5d'
}

class AuthService {
  public static async getUser(email:string, password:string) {
    const user = <IUser> await UserService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch:boolean = await compareHash(user?.password, password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user?.password;
    return user;
  }

  public static signToken(user:IUser) {
      const payload = {
        sub: user.userId,
        role: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret, jwtConfig);
      return {
        user,
        token
      };
  }
}

export default AuthService;
