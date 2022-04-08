import validatorHandler from "../middlewares/validatorHandler";
import express, { response } from "express";
import PostsService from './../services/postsService';
import { createPostSchema, updatePostSchema, getPostSchema } from "../services/models/schemas/postsSchemas";
import { IPost } from "../services/models/interfaces/interfaces";
const postsRouter = express.Router()

const service = new PostsService()

postsRouter.get('/', async (req, res) => {
  const posts:IPost[] = await service.find();
  res.status(200).json(posts);
});

postsRouter.get('/:id',
  validatorHandler(getPostSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const user:IPost = await service.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

postsRouter.post('/',
  validatorHandler(createPostSchema, 'body'),
  async (req, res) => {
  const body:IPost = req.body;
  const post:IPost = await service.create(body);
  res.status(201).json({
    message:"created",
    data:post
  });
});

postsRouter.patch('/:id',
  validatorHandler(getPostSchema, 'params'),
  validatorHandler(updatePostSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body:IPost = req.body;
    const post:IPost = await service.update(id, body);
    res.status(200).json({
      message:"updated",
      post
    });
  } catch (error) {
    next(error);
  }
});

postsRouter.delete('/:id',
  validatorHandler(getPostSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const res:string = await service.delete(id);
    response.status(200).json(res);
  } catch (error) {
    next(error);
  }
});

export default postsRouter;
