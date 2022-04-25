import { Post, PrismaClient } from '@prisma/client';
import {IPostService, IPostBody } from '../models/postInterface';
import { IUser } from '../models/userInterface';
const prisma = new PrismaClient();

class PostService implements IPostService {
  async getAllPosts() {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select:{userId:true, username:true}
        }
      }
    });
    return posts;
  }

  async getOnePost(id: number) {
    const post = await prisma.post.findUnique({
      where: {
        postId: id
      },
      include: {
        user: {
          select: {username:true}
      }
    }
    });
    return post;
  }

  async createPost(body:IPostBody, user:IUser) {
    const newPost = await prisma.post.create({
      data: {
        title:body.title,
        content:body.content,
        user: {
          connect: {userId: user.userId}
        }
      }
    });
    return newPost;
  }

  async patchPost(id:number, changes:IPostBody) {
    const updatedPost = await prisma.post.update({
      where : {
        postId: id
      },
      data : changes
    });
    return updatedPost;
  }

  async deletePost(id:number) {
    const post = await prisma.post.delete({
      where: {
        postId: id
      }
    });
    return post;
  }

  async getPostsByUser(id:number) {
    const posts = await prisma.post.findMany({
      where: {
        authorId: id
      },
      include: {
        user: {
          select: {firstname:true}
        }
      }
    });
    return posts;
  }
}

export default PostService;
