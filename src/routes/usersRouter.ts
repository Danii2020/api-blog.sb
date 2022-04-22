
import express  from "express";
import UsersController from '../controllers/usersController'
import { checkRoles } from "../middlewares/authHandler";
import passport from "passport";
import PostsController from "../controllers/postsController";
import ProfileController from "../controllers/profileController";
const usersRouter = express.Router()

usersRouter.get('/', UsersController.getAllUsers);

usersRouter.get('/sortbyalpha', UsersController.getSortedUsers);

usersRouter.get('/abcnames', UsersController.getABCNames);

usersRouter.get('/countabc', UsersController.getABCCount);

usersRouter.get('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getOneUser);


usersRouter.get('/:id/posts', PostsController.getPostsByUser);

usersRouter.get('/update/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), ProfileController.getNewProfile);

usersRouter.post('/update/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.patchUser);

usersRouter.get('/delete/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.deleteUser);

export default usersRouter;
