import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

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
      if (user === null) {
        res.sendStatus(404);
      }
      return res.status(200).json({
        data:user
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  public static async postUser(req:Request, res:Response):Promise<any> {
    try {
      const newUser = await prisma.user.create({
        data: {
          name:req.body.name,
          username:req.body.username,
          email:req.body.email,
          posts:req.body.post
        }
      });
      return res.status(200).json({
        message:"User created",
        data:newUser
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  public static async patchUser(req:Request, res:Response):Promise<any> {
    try {
      const updatedUser = await prisma.user.update({
        where : {
          userId: Number(req.params.id)
        },
        data : {
          name:req.body.name,
          username:req.body.username,
          email:req.body.email
        }
      });
      return res.status(201).json({
        message:"User updated",
        data:updatedUser
      })
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  public static async deleteUser(req:Request, res:Response):Promise<any> {
    try {
      const user = await prisma.user.delete({
        where: {
          userId: Number(req.params.id)
        }
      });
      if (user === null) {
        res.sendStatus(404);
      }
      return res.status(200).json({
        message:"User deleted",
        data:user
      })
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
}



export default UsersController;
