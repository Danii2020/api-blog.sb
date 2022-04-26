
import express  from "express";
import PostsController from "./../../controllers/API/postsController";
import { checkRoles } from "../../middlewares/authHandler";
import passport from "passport";

const postsRouterApi = express.Router()

postsRouterApi.get('/', PostsController.getAllPosts);

postsRouterApi.get('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.getOnePost);

postsRouterApi.post('/', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.postPost);

postsRouterApi.patch('/update/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.patchPost);

postsRouterApi.delete('/delete/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), PostsController.deletePost);

export default postsRouterApi;
