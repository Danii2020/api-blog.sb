import express from "express";
import usersRouter from './views/usersRouter';
import postsRouter from "./views/postsRouter";
import authRouter from "./views/authRouter";
import profileRouter from "./views/profileRouter";

import usersRouterApi from "./API/usersRouter";
import postsRouterApi from "./API/postsRouter";
import authRouterApi from "./API/authRouter";
import profileRouterApi from "./views/profileRouter";

export const routerApi = (app:any) => {
  const routerApi = express.Router();
  const routerView = express.Router()
  app.use('/api/v1', routerApi);
  app.use('/view', routerView )
  routerView.use('/users', usersRouter);
  routerView.use('/posts', postsRouter);
  routerView.use('/auth', authRouter);
  routerView.use('/profile', profileRouter);

  routerApi.use('/users', usersRouterApi);
  routerApi.use('/posts', postsRouterApi);
  routerApi.use('/auth', authRouterApi);
  routerApi.use('/profile', profileRouterApi);
}
