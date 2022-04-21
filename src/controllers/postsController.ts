import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { IPost, IUser, IUserReq } from '../models/interfaces';
import boom from '@hapi/boom';
import { hello } from '../helpers/viewHelpers';

const prisma = new PrismaClient();

class PostsController {
  public static async getAllPosts(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const post = <Array<IPost>> await prisma.post.findMany({
        include: {
          user: {
            select:{userId:true, username:true}
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
      return res.status(200).render("posts/updatePost", {post:post});
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async getPostsByUser(req:Request, res:Response, next:NextFunction):Promise<any> {
    console.log(req.params.id)
    try {
      const post = <Array<IPost>> await prisma.post.findMany({
        where: {
          authorId:Number(req.params.id)
        },
        include: {
          user: {
            select: {firstname:true}
          }
        }
      });
      if (post.length === 0) {
        next(boom.notFound("Post not found"));
      }
      console.log(post);
      return res.status(200).render("posts/userPost", {posts:post});
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async postPost(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const userReq= <IUserReq >req.user
      const user = <IUser> await prisma.user.findUnique({
        where: {
          userId:userReq.sub
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
      return res.status(200).redirect("/view/profile/my-posts");
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
      return res.status(201).redirect('/view/profile/my-posts');
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
      return res.status(200).redirect('/view/profile/my-posts');
    } catch (error) {
      console.log(error);
      next(boom.notFound("Post not found"));
    }
  }
}

export default PostsController;
