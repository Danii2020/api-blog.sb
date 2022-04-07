import express from "express";
import { UsersService } from './../services/usersService';
import { IUser } from "../services/models/interfaces/users";
const router = express.Router()

const service = new UsersService()

router.get('/', async (req, res) => {
  const users:IUser[] = await service.find();
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {

});

router.post('/', async (req, res) => {

});

router.patch('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

export default router;
