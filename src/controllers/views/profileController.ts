import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { IUserReq } from '../../models/userInterface';
import UserService from './../../services/usersService';
import PostService from './../../services/postService';
import boom from '@hapi/boom';

const prisma = new PrismaClient();
const userService = new UserService();
const postService = new PostService()

class ProfileController {
  public static async getPosts(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const user = <IUserReq> req.user;
      const posts = await postService.getPostsByUser(user.sub);
      return res.render("profile/myPosts", {posts:posts});
    } catch (error) {
      next(boom.internal("Internar server error"));
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
      const id:number = Number(req.params.id);
      const user = await userService.getOneUser(id);
      if (!user) {
        next(boom.notFound("User not found"));
      }
      return res.status(200).render("profile/updateProfile", {user:user});
    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }
}

export default ProfileController;
