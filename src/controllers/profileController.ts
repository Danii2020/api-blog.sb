import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import { IPost, IUser, IUserReq } from '../models/interfaces';

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
      const userReq = <IUserReq> req.user;
        const user = await prisma.user.findFirst({
            where: {
                userId:userReq.sub
            }
          });
        return res.render("profile/myUser", {user:user});
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
  }
  public static async getNewProfile(req: Request, res: Response, next:NextFunction) {
    try {
      const user = <IUser> await prisma.user.findUnique({
        where: {
          userId:Number(req.params.id)
        }
      });
      if (!user) {
        next(boom.notFound("User not found"));
      }
      delete user.password;
      delete user.role;
      return res.status(200).render("profile/updateProfile", {user:user});
    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }


}

export default ProfileController;
