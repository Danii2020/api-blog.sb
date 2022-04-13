"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
class ProfileController {
    static async getProfile(req, res) {
        try {
            const user = req.user;
            const posts = await prisma.post.findMany({
                where: {
                    user: {
                        userId: user.sub
                    }
                }
            });
            return res.status(200).json(posts);
        }
        catch (error) {
            boom_1.default.internal("Server error");
        }
    }
}
exports.default = ProfileController;
