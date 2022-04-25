
import express  from "express";
import UsersController from '../controllers/usersController'
import { checkRoles } from "../middlewares/authHandler";
import passport from "passport";
import PostsController from "../controllers/postsController";
import ProfileController from "../controllers/profileController";
const usersRouter = express.Router()

usersRouter.get('/', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getAllUsers);

usersRouter.get('/sortbyalpha', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getSortedUsers);

usersRouter.get('/abcnames', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getABCNames);

usersRouter.get('/countabc', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getABCCount);

usersRouter.get('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getOneUser);


usersRouter.get('/:id/posts', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), PostsController.getPostsByUser);

usersRouter.get('/update/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), ProfileController.getNewProfile);

usersRouter.post('/update/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.patchUser);

usersRouter.get('/delete/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.deleteUser);

export default usersRouter;
