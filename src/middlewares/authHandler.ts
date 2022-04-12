import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { config } from "../../config/config";

const checkApiKey = (req:Request, res:Response, next:NextFunction) => {
  const apiKey = req.headers['api'];
  (apiKey === config.apiKey)
    ? next()
    : next(boom.unauthorized());
}

export {checkApiKey}
