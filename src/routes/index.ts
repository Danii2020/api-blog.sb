import express from "express";
import usersRouter from './usersRouter';
import postsRouter from "./postsRouter";
import authRouter from "./authRouter";
import profileRouter from "./profileRouter";
import viewRouter from "./viewRouter";

export const routerApi = (app:any) => {
  const router = express.Router();
  const routerView = express.Router()
  app.use('/api/v1', router);
  app.use('/view', routerView)
  router.use('/users', usersRouter);
  router.use('/posts', postsRouter);
  router.use('/auth', authRouter);

  routerView.use('/auth', viewRouter);
  routerView.use('/profile', viewRouter);
  routerView.use('/posts', viewRouter);
}
