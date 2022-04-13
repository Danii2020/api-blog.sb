import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { IPost, IUser } from '../models/interfaces';
import boom from '@hapi/boom';

const prisma = new PrismaClient();

class PostsController {
  public static async getAllPosts(req:Request, res:Response):Promise<any> {
    try {
      const post =  await prisma.post.findMany({
        include: {
          user: {
            select:{username:true}
          }
        }
      });
      return res.status(200).json({
        data:post
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  public static async getOnePost(req:Request, res:Response):Promise<any> {
    try {
      const post = <IPost> await prisma.post.findUnique({
        where: {
          postId:Number(req.params.id)
        },
        include: {
          user: {
            select: {username:true}
        }
      }
      });
      if (!post) {
        res.sendStatus(404);
      }
      return res.status(200).json({
        data:post
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  public static async postPost(req:Request, res:Response):Promise<any> {
    try {
      const user = <IUser> await prisma.user.findUnique({
        where: {
          userId:req?.user?.sub
        }
      });
      if (!user) {
        boom.notFound("User not found");
      }
      const newPost = <IPost> await prisma.post.create({
        data: {
          title:req.body.title,
          content:req.body.content,
          user: {
            connect: {userId: user.userId}
          }
        }
      });
      return res.status(200).json({
        message:"Post created",
        data:newPost
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  public static async patchPost(req:Request, res:Response):Promise<any> {
    try {
      const updatedPost = <IPost> await prisma.post.update({
        where : {
          postId:Number(req.params.id)
        },
        data : {
          title:req.body.title,
          content:req.body.content
        }
      });
      if (!updatedPost) {
        res.sendStatus(404);
      }
      return res.status(201).json({
        message:"Post updated",
        data:updatedPost
      })
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  public static async deletePost(req:Request, res:Response):Promise<any> {
    try {
      const post = <IPost> await prisma.post.delete({
        where: {
          postId: Number(req.params.id)
        }
      });
      if (!post) {
        res.sendStatus(404);
      }
      return res.status(200).json({
        message:"Post deleted",
        data:post
      })
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
}

export default PostsController;
