"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatorHandler_1 = __importDefault(require("../middlewares/validatorHandler"));
const express_1 = __importStar(require("express"));
const usersService_1 = __importDefault(require("./../services/usersService"));
const usersSchema_1 = require("../services/models/schemas/usersSchema");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const usersRouter = express_1.default.Router();
const service = new usersService_1.default();
usersRouter.get('/', async (req, res) => {
    try {
        const user = await prisma.user.findMany({
            include: {
                profile: true
            }
        });
        res.status(200).json({
            data: user
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
usersRouter.get('/:id', (0, validatorHandler_1.default)(usersSchema_1.getUserSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await service.findOne(id);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
usersRouter.post('/', async (req, res) => {
    try {
        const result = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email
            }
        });
        res.status(200).json({
            message: "created",
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
usersRouter.patch('/:id', (0, validatorHandler_1.default)(usersSchema_1.getUserSchema, 'params'), (0, validatorHandler_1.default)(usersSchema_1.updateUserSchema, 'body'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = await service.update(id, body);
        res.status(200).json({
            message: "updated",
            user
        });
    }
    catch (error) {
        next(error);
    }
});
usersRouter.delete('/:id', (0, validatorHandler_1.default)(usersSchema_1.getUserSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const res = await service.delete(id);
        express_1.response.status(200).json(res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = usersRouter;
