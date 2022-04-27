import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { IUser, IUserReq } from '../../models/userInterface';
import PostService from './../../services/postService';
import boom from '@hapi/boom';

const prisma = new PrismaClient();
const postService = new PostService();

class PostsController {
  public static async getAllPosts(req:Request, res:Response, next:NextFunction) {
    try {
      const posts = await postService.getAllPosts();
      return res.status(200).json({
        data:posts
      });
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async getOnePost(req:Request, res:Response, next:NextFunction) {
    try {
      const id:number = Number(req.params.id);
      const post = await postService.getOnePost(id);
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

  public static async getPostsByUser(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const userReq = req.user;
      console.log(userReq)
      const id:number = Number(req.params.id);
      const posts = await postService.getPostsByUser(id);
      if (posts.length === 0) {
        next(boom.notFound("Post not found"));
      }
      return res.status(200).json({
        data:posts
      });
    } catch (error) {
      console.log(error);
      next(boom.notFound("Post not found"));
    }
  }

  public static async postPost(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const body = req.body;
      const userReq= <IUserReq> req.user
      const user = <IUser> await prisma.user.findUnique({
        where: {
          userId:userReq.sub
        }
      });
      if (!user) {
        next(boom.notFound("User not found"));
      }
      const newPost = await postService.createPost(body, user);
      return res.status(200).json({
        message:"Post created",
        data:newPost
      });
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async patchPost(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      if ('_method' in req.body) {
        delete req.body._method;
      }
      const id:number = Number(req.params.id);
      const body = req.body;
      const updatedPost = await postService.patchPost(id, body);

      return res.status(201).json({
        message:"Post updated",
        data:updatedPost
      });
    } catch (error) {
      console.log(error)
      next(boom.notFound("Post not found"));
    }
  }

  public static async deletePost(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const id:number = Number(req.params.id);
      const post = await postService.deletePost(id);
      return res.status(200).json({
        message:"Post deleted",
        data:post
      });
    } catch (error) {
      console.log(error);
      next(boom.notFound("Post not found"));
    }
  }
}

export default PostsController;
