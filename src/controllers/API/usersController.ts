import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import { IUser, IUserChanges } from '../../models/userInterface';
import UserService from './../../services/usersService';

const userService = new UserService()

class UsersController {
  public static async getAllUsers(req:Request, res:Response, next:NextFunction) {
    console.log(req)
    try {
      const userReq = req.user;
      console.log(userReq)
      const users = <IUser[]> await userService.getAllUsers();
      users.map(user => (delete user.password, delete user.role))
      return res.status(200).json({
        data:users
      });
    } catch (error) {
      console.log(error);
      next(boom.internal("Internar server error"));
    }
  }

  public static async getOneUser(req:Request, res:Response, next:NextFunction) {
    try {
      const id:number = Number(req.params.id);
      const user = <IUser> await userService.getOneUser(id);
      if (!user) {
        next(boom.notFound("User not found"));
      }
      delete user.role;
      delete user.password;
      return res.status(200).json({
        data:user
      });
    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }

  public static async patchUser(req:Request, res:Response, next:NextFunction) {
    try {
      if ('_method' in req.body) {
        delete req.body._method;
      }
      const id:number = Number(req.params.id);
      const changes:IUserChanges = req.body;
      const updatedUser = await userService.patchUser(id, changes);
      return res.status(201).json({
        message:"User updated",
        data:updatedUser
      });
    } catch (error) {
      console.log(error);
      next(boom.notFound("User not found"));
    }
  }

  public static async deleteUser(req:Request, res:Response, next:NextFunction) {
    try {
      const id:number = Number(req.params.id);
      const user = await userService.deleteUser(id);
      return res.status(200).json({
        message:"User deleted",
        data:user
      });
    } catch (error) {
      console.log(error);
      next(boom.notFound("User not found"));
    }
  }

  public static async getSortedUsers(req:Request, res:Response, next:NextFunction) {
    try {
      const users = await userService.getSortedUsers()
      if (!users){
        next(boom.notFound("Users not found"));
      }
      return res.status(200).json({
        data:users
      });
    } catch (error) {
      console.log(error);
      next(boom.internal("Server error"));
    }
  }

  public static async getABCNames(req:Request, res:Response, next:NextFunction) {
    try {
      const abcNames = await userService.findABCNames();
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

  public static async getABCCount(req:Request, res:Response, next:NextFunction) {
    try {
      const abcCount = await userService.countABCNames();
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
