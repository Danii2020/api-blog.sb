
import express  from "express";
import UsersController from '../controllers/usersController'
import { checkRoles } from "../middlewares/authHandler";
import passport from "passport";
import PostsController from "../controllers/postsController";
const usersRouter = express.Router()

usersRouter.get('/', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getAllUsers);

usersRouter.get('/sortbyalpha', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getSortedUsers);

usersRouter.get('/abcnames', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getABCNames);

usersRouter.get('/countabc', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getABCCount);

usersRouter.get('/profile/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getOneUser);


usersRouter.get('/profile/:id/posts', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.getPostsByUser);

usersRouter.patch('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.patchUser);

usersRouter.delete('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.deleteUser);

export default usersRouter;
