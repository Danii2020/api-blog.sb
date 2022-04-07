import express from "express";
const usersRouter = require('./usersRouter');

export const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
}
