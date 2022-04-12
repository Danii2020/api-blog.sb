import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { config } from "../../config/config";
import { IUser } from "../models/interfaces";

const checkApiKey = (req:Request, res:Response, next:NextFunction) => {
  const apiKey = req.headers['api'];
  (apiKey === config.apiKey)
    ? next()
    : next(boom.unauthorized());
}

const checkAdminRole = (req:Request, res:Response, next:NextFunction) => {
  const user:IUser = req.user;
  (user.role === 'admin')
    ? next()
    : next(boom.unauthorized());
}

export { checkApiKey, checkAdminRole }
