
import express, { response } from "express";
import UsersController from '../controllers/usersController'

import { IUser } from "../models/interfaces/interfaces";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const usersRouter = express.Router()

usersRouter.get('/', UsersController.getAllUsers);

usersRouter.get('/:id', UsersController.getOneUser);

usersRouter.post('/', UsersController.postUser);

// usersRouter.patch('/:id',
//   validatorHandler(getUserSchema, 'params'),
//   validatorHandler(updateUserSchema, 'body'),
//   async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const body:IUser = req.body;
//     const user:IUser = await service.update(id, body);
//     res.status(200).json({
//       message:"updated",
//       user
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// usersRouter.delete('/:id',
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const res:string = await service.delete(id);
//     response.status(200).json(res);
//   } catch (error) {
//     next(error);
//   }
// });

export default usersRouter;
