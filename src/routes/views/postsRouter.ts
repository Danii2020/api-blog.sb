
import express  from "express";
import PostsController from './../../controllers/views/postsController';
import { checkRoles } from "../../middlewares/authHandler";
import passport from "passport";

const postsRouter = express.Router()

postsRouter.get('/', PostsController.getAllPosts);

postsRouter.get('/update/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.getOnePost);

postsRouter.post('/', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.postPost);

postsRouter.patch('/update/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.patchPost);

postsRouter.delete('/delete/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.deletePost);

export default postsRouter;
