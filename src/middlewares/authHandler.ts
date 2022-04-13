import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { config } from "../../config/config";
import { IUser } from "../models/interfaces";
import passport from "passport";

const checkApiKey = (req:Request, res:Response, next:NextFunction) => {
  const apiKey = req.headers['api'];
  (apiKey === config.apiKey)
    ? next()
    : next(boom.unauthorized());
}


const checkRoles = (...roles:Array<string>) => {
  return (req:Request, res:Response, next:NextFunction) => {
    const user:IUser = req.user;
    (roles.includes(user.role))
    ? next()
    : next(boom.forbidden("You don't have permission to access to this resource"));
  }
}



export { checkApiKey, checkRoles }
