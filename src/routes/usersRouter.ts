
import express  from "express";
import UsersController from '../controllers/usersController'
import { checkRoles } from "../middlewares/authHandler";
import passport from "passport";
const usersRouter = express.Router()

usersRouter.get('/', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getAllUsers);

usersRouter.get('/sortbyalpha', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.getSortedUsers);

usersRouter.get('/abcnames', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.getABCNames);

usersRouter.get('/countabc', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.getABCCount);

usersRouter.get('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.getOneUser);

usersRouter.patch('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.patchUser);

usersRouter.delete('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.deleteUser);

export default usersRouter;
