"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class UsersController {
    static async getAllUsers(req, res) {
        try {
            const user = await prisma.user.findMany({
                include: {
                    posts: true
                }
            });
            return res.status(200).json({
                data: user
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async getOneUser(req, res) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    userId: Number(req.params.id)
                },
                include: {
                    posts: true
                }
            });
            if (user === null) {
                res.sendStatus(404);
            }
            return res.status(200).json({
                data: user
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async postUser(req, res) {
        try {
            const hash = await bcrypt_1.default.hash(req.body.password, 10);
            const newUser = await prisma.user.create({
                data: {
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    posts: req.body.post
                }
            });
            delete newUser.password;
            return res.status(200).json({
                message: "User created",
                data: newUser
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async patchUser(req, res) {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    userId: Number(req.params.id)
                },
                data: {
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
            });
            delete updatedUser.password;
            return res.status(201).json({
                message: "User updated",
                data: updatedUser
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async deleteUser(req, res) {
        try {
            const user = await prisma.user.delete({
                where: {
                    userId: Number(req.params.id)
                }
            });
            if (user === null) {
                res.sendStatus(404);
            }
            return res.status(200).json({
                message: "User deleted",
                data: user
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
}
exports.default = UsersController;
