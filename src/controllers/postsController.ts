import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { IPost, IUser } from '../models/interfaces';
import boom from '@hapi/boom';

const prisma = new PrismaClient();

class PostsController {
  public static async getAllPosts(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const post =  await prisma.post.findMany({
        include: {
          user: {
            select:{username:true}
          }
        }
      });
      return res.render("index", {posts:post});
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async getOnePost(req:Request, res:Response, next:NextFunction):Promise<any> {
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
        next(boom.notFound("Post not found"));
      }
      return res.status(200).json({
        data:post
      });
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async postPost(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const user = <IUser> await prisma.user.findUnique({
        where: {
          userId:req?.user?.sub
        }
      });
      if (!user) {
        next(boom.notFound("User not found"));
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
      return res.redirect("/view/profile/my-posts");
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async patchPost(req:Request, res:Response, next:NextFunction):Promise<any> {
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
      return res.status(201).json({
        message:"Post updated",
        data:updatedPost
      })
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async deletePost(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const post = <IPost> await prisma.post.delete({
        where: {
          postId: Number(req.params.id)
        }
      });
      console.log(post)
      return res.status(200).json({
        message:"Post deleted",
        data:post
      })
    } catch (error) {
      console.log(error);
      next(boom.notFound("Post not found"));
    }
  }
}

export default PostsController;
