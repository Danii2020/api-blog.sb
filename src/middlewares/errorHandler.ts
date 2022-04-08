import { Boom } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";

const logErrors = (err:Error, req:Request, res:Response, next:NextFunction) => {
  console.log(err);
  next(err);
}

const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
  res.status(500).json({
    message:err.message,
    stack:err.stack
  });
}

const boomErrorHandler = (err:Boom, req:Request, res:Response, next:NextFunction) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
}

export {logErrors, errorHandler, boomErrorHandler}

