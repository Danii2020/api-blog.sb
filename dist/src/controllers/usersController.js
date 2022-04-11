"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import validatorHandler from '../middlewares/validatorHandler';
// import { createUserSchema, updateUserSchema, getUserSchema } from "../models/schemas/usersSchema";
// import boom from '@hapi/boom';
const client_1 = require("@prisma/client");
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
            const newUser = await prisma.user.create({
                data: {
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    posts: req.body.post
                }
            });
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
                    email: req.body.email
                }
            });
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
