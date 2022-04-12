
import express  from "express";
import UsersController from '../controllers/usersController'
import { PrismaClient } from "@prisma/client";
import { checkAdminRole } from "../middlewares/authHandler";
import passport from "passport";

const prisma = new PrismaClient();
const usersRouter = express.Router()

usersRouter.get('/', UsersController.getAllUsers);

usersRouter.get('/:id', UsersController.getOneUser);

usersRouter.post('/', UsersController.postUser);

usersRouter.patch('/:id', passport.authenticate('jwt', {session: false}), UsersController.patchUser);

usersRouter.delete('/:id', passport.authenticate('jwt', {session: false}),
  checkAdminRole, UsersController.deleteUser);

export default usersRouter;
