
import express  from "express";
import PostsController from '../controllers/postsController'
import { PrismaClient } from "@prisma/client";
import { checkRoles } from "../middlewares/authHandler";
import passport from "passport";

const postsRouter = express.Router()

postsRouter.get('/', PostsController.getAllPosts);

postsRouter.get('/:id', PostsController.getOnePost);

postsRouter.post('/', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.postPost);

postsRouter.patch('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.patchPost);

postsRouter.delete('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), PostsController.deletePost);

export default postsRouter;
