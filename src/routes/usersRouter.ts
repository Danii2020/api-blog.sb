
import express  from "express";
import UsersController from '../controllers/usersController'
import { PrismaClient } from "@prisma/client";
import { checkRoles } from "../middlewares/authHandler";
import passport from "passport";

const prisma = new PrismaClient();
const usersRouter = express.Router()

usersRouter.get('/', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.getAllUsers);
usersRouter.get('/sortbyalpha', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.getSortedUsers);

usersRouter.get('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.getOneUser);

usersRouter.patch('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin", "user"), UsersController.patchUser);

usersRouter.delete('/:id', passport.authenticate('jwt', {session: false}),
checkRoles("admin"), UsersController.deleteUser);

export default usersRouter;
