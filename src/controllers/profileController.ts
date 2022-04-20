import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import { IPost, IUserReq } from '../models/interfaces';

const prisma = new PrismaClient();

class ProfileController {
  public static async getPosts(req:Request, res:Response):Promise<any> {
    console.log(req.user);
    try {
      const user = <IUserReq> req.user;
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

  public static async getNewPost(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      res.render("profile/newPost");
    } catch (error) {
      next(boom.internal("Internal server error"));
    }
  }

  public static async getMyProfile(req: Request, res: Response, next:NextFunction) {
    try{
      const user = <IUserReq> req.user;
        const profile = await prisma.user.findFirst({
            where: {
                userId:user.sub
            }
          });
        return res.render("profile/myUser", {profile});
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
  }
}

export default ProfileController;
