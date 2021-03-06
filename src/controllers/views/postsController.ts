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
      return res.render("index", {posts:posts});
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
      return res.status(200).render("posts/updatePost", {post:post});
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
      return res.status(200).render("posts/userPost", {posts:posts, userReq:userReq, userId:id});
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async getNewPost(req:Request, res:Response, next:NextFunction) {
    try {
      res.render("posts/newPost", {userId:req.params.id});
    } catch (error) {
      next(boom.internal("Internal server error"));
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
      return res.status(200).redirect("/view/profile/my-posts");
    } catch (error) {
      console.log(error);
      next(boom.internal("Internal server error"));
    }
  }

  public static async postPostByUser(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const body = req.body;
      const userId:number = Number(req.params.id)
      const user = <IUser> await prisma.user.findUnique({
        where: {
          userId:userId
        }
      });
      if (!user) {
        next(boom.notFound("User not found"));
      }
      const newPost = await postService.createPost(body, user);
      return res.status(200).redirect("/view/profile/my-posts");
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
      return res.status(201).redirect('/view/profile/my-posts');
    } catch (error) {
      console.log(error);
      next(boom.notFound("Post not found"));
    }
  }

  public static async deletePost(req:Request, res:Response, next:NextFunction):Promise<any> {
    console.log(req)
    try {
      const id:number = Number(req.params.id);
      const post = await postService.deletePost(id);
      return res.status(200).redirect('/view/profile/my-posts');
    } catch (error) {
      console.log(error);
      next(boom.notFound("Post not found"));
    }
  }
}

export default PostsController;
