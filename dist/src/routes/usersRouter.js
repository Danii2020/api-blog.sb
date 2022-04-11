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
usersRouter.patch('/:id', usersController_1.default.patchUser);
usersRouter.delete('/:id', usersController_1.default.deleteUser);
exports.default = usersRouter;
