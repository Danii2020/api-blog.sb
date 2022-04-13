import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import boom from '@hapi/boom';
import argon2 from 'argon2';
import { IUser } from '../models/interfaces';

const prisma = new PrismaClient();

class UsersController {
  public static async getAllUsers(req:Request, res:Response):Promise<any> {
    try {
      const user = <IUser> <unknown> await prisma.user.findMany({
        include: {
          posts: true
        }
      });
      delete user.password;
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
      const user = <IUser> await prisma.user.findUnique({
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
      delete user.password;
      return res.status(200).json({
        data:user
      });
    } catch (error) {
      console.log(error);
      boom.internal("Server error");
    }
  }

  public static async patchUser(req:Request, res:Response):Promise<any> {
    try {
      const updatedUser  = <IUser> await prisma.user.update({
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
      const user = <IUser> await prisma.user.delete({
        where: {
          userId: Number(req.params.id)
        }
      });
      if (!user) {
        boom.notFound("User not found");
      }
      delete user.password;
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
