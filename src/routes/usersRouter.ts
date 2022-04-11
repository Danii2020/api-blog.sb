
import express  from "express";
import UsersController from '../controllers/usersController'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const usersRouter = express.Router()

usersRouter.get('/', UsersController.getAllUsers);

usersRouter.get('/:id', UsersController.getOneUser);

usersRouter.post('/', UsersController.postUser);

usersRouter.patch('/:id', UsersController.patchUser);

usersRouter.delete('/:id', UsersController.deleteUser);

export default usersRouter;
