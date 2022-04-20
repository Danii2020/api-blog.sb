import express from "express";
import usersRouter from './usersRouter';
import postsRouter from "./postsRouter";
import authRouter from "./authRouter";
import profileRouter from "./profileRouter";

export const routerApi = (app:any) => {
  const router = express.Router();
  //const routerView = express.Router()
  //app.use('/api/v1', router);
  app.use('/view', router)
  router.use('/users', usersRouter);
  router.use('/posts', postsRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}
