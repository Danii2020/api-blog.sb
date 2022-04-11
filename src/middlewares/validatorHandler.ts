import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { Schema, string } from 'joi';

const validatorHandler = (schema:Schema, property:string) => {
  return (req:Request, res:Response, next:NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, {abortEarly:false});
    if (error) {
      next(boom.badRequest(error));
    }
    next()
  }
}

export default validatorHandler;
