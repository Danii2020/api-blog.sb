import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { IUserReq } from '../../models/userInterface';
import PostService from './../../services/postService';
import boom from '@hapi/boom';

const prisma = new PrismaClient();
const postService = new PostService()

class ProfileController {
  public static async getPosts(req:Request, res:Response):Promise<any> {
    try {
      const user = <IUserReq> req.user;
      const posts = await postService.getPostsByUser(user.sub);
      return res.status(200).json({
        data: posts
      });
    } catch (error) {
      boom.internal("Server error");
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
        return res.status(200).json({
          data:user
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
  }
}

export default ProfileController;
