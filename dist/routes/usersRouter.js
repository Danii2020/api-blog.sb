"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const usersService_1 = require("./../services/usersService");
exports.router = express_1.default.Router();
const service = new usersService_1.UsersService();
exports.router.get('/', async (req, res) => {
    const users = await service.find();
    res.status(200).json(users);
});
exports.router.get('/:id', async (req, res) => {
});
exports.router.post('/', async (req, res) => {
});
exports.router.patch('/:id', async (req, res) => {
});
exports.router.delete('/:id', async (req, res) => {
});
