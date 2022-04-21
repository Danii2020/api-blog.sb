const express = require('express');
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/errorHandler';
import { NextFunction, Request, Response } from "express";
import { routerApi } from "./routes";
import { config } from '../config/config';
import cookieParser from 'cookie-parser';
import PostsController from './controllers/postsController';
import { deletePost, hello } from '../views/helpers/viewHelpers';

const app = express();

console.log(app.locals)
const port = config.port;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
require('./../utils/auth');

app.set('view engine', 'pug');
app.set('views', './views');

app.locals.deletepost = deletePost;

console.log(app.locals)

app.get('/', PostsController.getAllPosts);

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening in ' + port);
})

export {app}
