"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const usersRouter = express_1.default.Router();
usersRouter.get('/', usersController_1.default.getAllUsers);
usersRouter.get('/:id', usersController_1.default.getOneUser);
usersRouter.post('/', usersController_1.default.postUser);
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
exports.default = usersRouter;
