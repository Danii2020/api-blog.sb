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
                    profile: true,
                    post: true
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
                    id: Number(req.params.id)
                },
                include: {
                    profile: true,
                    post: true
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
                    email: req.body.email,
                    post: req.body.post,
                    profile: req.body.profile
                }
            });
            res.status(200).json({
                message: "created",
                data: newUser
            });
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
}
exports.default = UsersController;
