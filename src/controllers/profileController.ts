import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import boom from '@hapi/boom';
import { IUser } from '../models/interfaces';

const prisma = new PrismaClient();

class ProfileController {
  public static async getProfile(req:Request, res:Response) {
    try {
      const user = req.user;
      const posts = await prisma.post.findMany({
        where: {
          user: {
            userId:user.sub
          }
        }
      });
      return res.status(200).json(posts);
    } catch (error) {
      boom.internal("Server error");
    }

  }
}

export default ProfileController;
