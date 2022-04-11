
import express  from "express";
import PostsController from '../controllers/postsController'
import { PrismaClient } from "@prisma/client";
const postsRouter = express.Router()

postsRouter.get('/', PostsController.getAllPosts);

postsRouter.get('/:id', PostsController.getOnePost);

postsRouter.post('/', PostsController.postPost);

postsRouter.patch('/:id', PostsController.patchPost);

postsRouter.delete('/:id', PostsController.deletePost);

export default postsRouter;
