import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();


class UserService {
  public static async findByEmail(email:string) {
    const user = await prisma.user.findUnique({
      where: { email:email}
    });
    return user;
  }
}

export default UserService;
