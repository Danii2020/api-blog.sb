"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import validatorHandler from '../middlewares/validatorHandler';
// import { createUserSchema, updateUserSchema, getUserSchema } from "../models/schemas/usersSchema";
// import boom from '@hapi/boom';
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProfileController {
    static async getAllProfiles(req, res) {
        try {
            const profile = await prisma.profile.findMany({
                include: {
                    user: true
                }
            });
            return res.status(200).json({
                data: profile
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async getOneProfile(req, res) {
        try {
            const profile = await prisma.profile.findUnique({
                where: {
                    profileId: Number(req.params.id)
                },
                include: {
                    user: true
                }
            });
            if (profile === null) {
                res.sendStatus(404);
            }
            return res.status(200).json({
                data: profile
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
}
exports.default = ProfileController;
