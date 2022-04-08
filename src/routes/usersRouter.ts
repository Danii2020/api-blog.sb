import validatorHandler from "../middlewares/validatorHandler";
import express, { response } from "express";
import UsersService from './../services/usersService';
import { createUserSchema, updateUserSchema, getUserSchema } from "../services/models/schemas/usersSchema";
import { IUser } from "../services/models/interfaces/interfaces";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const usersRouter = express.Router()

const service = new UsersService()

usersRouter.get('/', async (req, res, ) => {
  try {
    const user = await prisma.user.findMany({
      include: {
        profile: true
      }
    });
    res.status(200).json({
      data:user
    })
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

usersRouter.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const user:IUser = await service.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const result = await prisma.user.create({
      data: {
        name:req.body.name,
        email:req.body.email
      }
    });
    res.status(200).json({
      message:"created",
      data:result
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

});

usersRouter.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body:IUser = req.body;
    const user:IUser = await service.update(id, body);
    res.status(200).json({
      message:"updated",
      user
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const res:string = await service.delete(id);
    response.status(200).json(res);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
