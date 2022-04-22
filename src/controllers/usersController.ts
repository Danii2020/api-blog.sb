import { PrismaClient} from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import { IUser } from '../models/interfaces';
import UserService from '../services/usersService';

const prisma = new PrismaClient();

class UsersController {
  public static async getAllUsers(req:Request, res:Response):Promise<any> {
    try {
      const users = <IUser[]> await prisma.user.findMany();
      users.map(user => delete user.password);
      users.map(user => delete user.role);
      console.log(users);
      return res.status(200).render("users/usersList", {users:users});
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  public static async getOneUser(req:Request, res:Response, next:NextFunction):Promise<any> {
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
        next(boom.notFound("User not found"));
      }
      delete user.password;
      delete user.role;
      console.log(user);
      return res.status(200).render("users/userProfile", {user:user});
    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }

  public static async patchUser(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const updatedUser  = <IUser> await prisma.user.update({
        where : {
          userId: Number(req.params.id)
        },
        data : {
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          username:req.body.username,
          email:req.body.email,
          password:req.body.password
        }
      });
      delete updatedUser.password;
      return res.status(201).redirect('/view/profile/');
    } catch (error) {
      console.log(error);
      next(boom.notFound("User not found"));
    }
  }

  public static async deleteUser(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const user = <IUser> await prisma.user.delete({
        where: {
          userId: Number(req.params.id),

        }
      });
      delete user.password;
      return res.status(200).redirect('/');
    } catch (error) {
      console.log(error);
      next(boom.notFound("User not found"));
    }
  }

  public static async getSortedUsers(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const users = <IUser[]> await prisma.user.findMany();
      if (!users){
        next(boom.notFound("Users not found"));
      }
      const orderedUsers = users.sort((a, b) => {
        return a.firstname === b.firstname ? 0: a.firstname > b.firstname ? 1: -1;
      });
      const upperUsers = orderedUsers.map(user => ({
        firstname:user.firstname,
        lastname:user.lastname.toUpperCase()
      }));
      return res.status(200).json({
        data:upperUsers
      });

    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }

  public static async getABCNames(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const abcNames:IUser[] = await UserService.findABCNames();
      if (!abcNames){
        next(boom.notFound("Users not found"));
      }
      return res.status(200).json({
        data:abcNames
      });
    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }

  public static async getABCCount(req:Request, res:Response, next:NextFunction):Promise<any> {
    try {
      const abcCount = await UserService.countABCNames();
      if (!abcCount){
        next(boom.notFound("Users not found"));
      }
      return res.status(200).json({
        data:abcCount
      });
    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }
}

export default UsersController;
