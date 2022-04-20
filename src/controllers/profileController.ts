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
      const userReq = <IUserReq> req.user;
        const user = await prisma.user.findFirst({
            where: {
                userId:userReq.sub
            }
          });
        return res.render("profile/myUser", {user:user, postUrl:'/view/profile/my-posts'});
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
  }

  public static async getPostsByUser(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const post = <Array<IPost>> await prisma.post.findMany({
        where: {
          authorId:Number(req.params.id)
        }
      });
      if (!post) {
        next(boom.notFound("Post not found"));
      }
      return res.render("profile/userPost", {post:post});
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }
}

export default ProfileController;
