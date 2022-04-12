import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import boom from '@hapi/boom';
import argon2 from 'argon2';

const prisma = new PrismaClient();

class UsersController {
  public static async getAllUsers(req:Request, res:Response):Promise<any> {
    try {
      const user = await prisma.user.findMany({
        include: {
          posts:true
        }
      });
      return res.status(200).json({
        data:user
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  public static async getOneUser(req:Request, res:Response):Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          userId:Number(req.params.id)
        },
        include: {
          posts:true
        }
      });
      if (!user) {
        boom.notFound("User not found");
      }
      return res.status(200).json({
        data:user
      });
    } catch (error) {
      console.log(error);
      boom.internal("Server error");
    }
  }

  public static async postUser(req:Request, res:Response):Promise<any> {
    try {
      const hash = await argon2.hash(req.body.password, {type: argon2.argon2id});
      console.log(hash);
      const newUser:User = await prisma.user.create({
        data: {
          name:req.body.name,
          username:req.body.username,
          email:req.body.email,
          password:hash,
          role:req.body.role || 'user',
          posts:req.body.post
        }
      });
      delete newUser.password;
      return res.status(200).json({
        message:"User created",
        data:newUser
      });
    } catch (error) {
      console.log(error);
      boom.internal("Server error");
    }
  }

  public static async patchUser(req:Request, res:Response):Promise<any> {
    try {
      const updatedUser:User = await prisma.user.update({
        where : {
          userId: Number(req.params.id)
        },
        data : {
          name:req.body.name,
          username:req.body.username,
          email:req.body.email,
          password:req.body.password
        }
      });
      if (!updatedUser) {
        boom.notFound("User not found");
      }
      delete updatedUser.password;
      return res.status(201).json({
        message:"User updated",
        data:updatedUser
      })
    } catch (error) {
      console.log(error);
      boom.internal("Server error");
    }
  }

  public static async deleteUser(req:Request, res:Response):Promise<any> {
    try {
      const user:User = await prisma.user.delete({
        where: {
          userId: Number(req.params.id)
        }
      });
      if (!user) {
        boom.notFound("User not found");
      }
      return res.status(200).json({
        message:"User deleted",
        data:user
      })
    } catch (error) {
      console.log(error);
      boom.internal("Server error");
    }
  }
}



export default UsersController;
