"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const postService_1 = __importDefault(require("./../../services/postService"));
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
const postService = new postService_1.default();
class ProfileController {
    static async getPosts(req, res) {
        try {
            const user = req.user;
            const posts = await postService.getPostsByUser(user.sub);
            return res.status(200).json({
                data: posts
            });
        }
        catch (error) {
            boom_1.default.internal("Server error");
        }
    }
    static async getMyProfile(req, res, next) {
        try {
            const userReq = req.user;
            const user = await prisma.user.findFirst({
                where: {
                    userId: userReq.sub
                }
            });
            return res.status(200).json({
                data: user
            });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
}
exports.default = ProfileController;
