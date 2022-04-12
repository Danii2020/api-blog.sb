
import express  from "express";
import PostsController from '../controllers/postsController'
import { PrismaClient } from "@prisma/client";
import { checkAdminRole } from "../middlewares/authHandler";
import passport from "passport";

const postsRouter = express.Router()

postsRouter.get('/', PostsController.getAllPosts);

postsRouter.get('/:id', PostsController.getOnePost);

postsRouter.post('/', passport.authenticate('jwt', {session: false}),
  checkAdminRole, PostsController.postPost);

postsRouter.patch('/:id', passport.authenticate('jwt', {session: false}), PostsController.patchPost);

postsRouter.delete('/:id', passport.authenticate('jwt', {session: false}), PostsController.deletePost);

export default postsRouter;
