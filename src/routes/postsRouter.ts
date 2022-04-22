
import express  from "express";
import PostsController from '../controllers/postsController';
import { checkRoles } from "../middlewares/authHandler";
import passport from "passport";

const postsRouter = express.Router()

postsRouter.get('/', PostsController.getAllPosts);

postsRouter.get('/update/:id', PostsController.getOnePost);

postsRouter.post('/', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.postPost);

postsRouter.post('/update/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.patchPost);

postsRouter.get('/delete/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.deletePost);

export default postsRouter;
