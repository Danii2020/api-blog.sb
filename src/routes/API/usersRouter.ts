
import express  from "express";
import UsersController from "./../../controllers/API/usersController";
import { checkRoles } from "../../middlewares/authHandler";
import passport from "passport";
import PostsController from "../../controllers/API/postsController";

const usersRouterApi = express.Router()

usersRouterApi.get('/', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getAllUsers);

usersRouterApi.get('/sortbyalpha', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getSortedUsers);

usersRouterApi.get('/abcnames', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getABCNames);

usersRouterApi.get('/countabc', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getABCCount);

usersRouterApi.get('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getOneUser);


usersRouterApi.get('/:id/posts', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.getPostsByUser);

usersRouterApi.post('/update/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.patchUser);

usersRouterApi.get('/delete/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.deleteUser);

export default usersRouterApi;
