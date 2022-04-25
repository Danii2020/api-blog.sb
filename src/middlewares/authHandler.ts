import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { config } from "../../config/config";
import { IUser } from "../models/userInterface";

const checkRoles = (...roles:Array<string>) => {
  return (req:Request, res:Response, next:NextFunction) => {
    const user = <IUser> req.user;
    (roles.includes(user.role as string))
    ? next()
    : next(boom.forbidden("You don't have permission to access to this resource"));
  }
}

export { checkRoles }
