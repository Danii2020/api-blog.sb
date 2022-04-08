import validatorHandler from "../middlewares/validatorHandler";
import express, { response } from "express";
import UsersService from './../services/usersService';
import { createUserSchema, updateUserSchema, getUserSchema } from "../services/models/interfaces/schemas/usersSchema";
import { IUser } from "../services/models/interfaces/users";
const usersRouter = express.Router()

const service = new UsersService()

usersRouter.get('/', async (req, res) => {
  const users:IUser[] = await service.find();
  res.status(200).json(users);
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

usersRouter.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
  const body:IUser = req.body;
  const user:IUser = await service.create(body);
  res.status(201).json({
    message:"created",
    data:user
  });
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
