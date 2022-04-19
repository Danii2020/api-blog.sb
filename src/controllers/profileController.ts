import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import boom from '@hapi/boom';
import { IPost, IUser } from '../models/interfaces';

const prisma = new PrismaClient();

class ProfileController {
  public static async getProfile(req:Request, res:Response):Promise<any> {
    try {
      const user = <IUser> req.user;
      const posts = <IPost> <unknown> await prisma.post.findMany({
        where: {
          user: {
            userId:user?.sub
          }
        }
      });
      return res.render("profile/myPosts", {posts:posts});
    } catch (error) {
      boom.internal("Server error");
    }

  }
}

export default ProfileController;
