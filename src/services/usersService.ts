import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { IUser } from '../models/interfaces';

const prisma = new PrismaClient();


class UserService {
  public static async findByEmail(email:string) {
    const user = <IUser> await prisma.user.findUnique({
      where: { email:email}
    });
    return user;
  }
}

export default UserService;
