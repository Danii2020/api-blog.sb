"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const argon2_1 = __importDefault(require("argon2"));
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
            if (!user) {
                boom_1.default.notFound("User not found");
            }
            return res.status(200).json({
                data: user
            });
        }
        catch (error) {
            console.log(error);
            boom_1.default.internal("Server error");
        }
    }
    static async postUser(req, res) {
        try {
            const hash = await argon2_1.default.hash(req.body.password, { type: argon2_1.default.argon2id });
            console.log(hash);
            const newUser = await prisma.user.create({
                data: {
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    role: 'user',
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
            boom_1.default.internal("Server error");
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
            if (!updatedUser) {
                boom_1.default.notFound("User not found");
            }
            delete updatedUser.password;
            return res.status(201).json({
                message: "User updated",
                data: updatedUser
            });
        }
        catch (error) {
            console.log(error);
            boom_1.default.internal("Server error");
        }
    }
    static async deleteUser(req, res) {
        try {
            const user = await prisma.user.delete({
                where: {
                    userId: Number(req.params.id)
                }
            });
            if (!user) {
                boom_1.default.notFound("User not found");
            }
            return res.status(200).json({
                message: "User deleted",
                data: user
            });
        }
        catch (error) {
            console.log(error);
            boom_1.default.internal("Server error");
        }
    }
}
exports.default = UsersController;
