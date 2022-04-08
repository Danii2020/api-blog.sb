import express from "express";
import usersRouter from './usersRouter';
import postsRouter from "./postsRouter";

export const routerApi = (app:any) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/posts', postsRouter);
}
