"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
class ProfileController {
    static async getPosts(req, res) {
        console.log(req.user);
        try {
            const user = req.user;
            const posts = await prisma.post.findMany({
                where: {
                    user: {
                        userId: user?.sub
                    }
                }
            });
            return res.render("profile/myPosts", { posts: posts });
        }
        catch (error) {
            boom_1.default.internal("Server error");
        }
    }
    static async getNewPost(req, res, next) {
        try {
            res.render("profile/newPost");
        }
        catch (error) {
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async getMyProfile(req, res, next) {
        try {
            const user = req.user;
            const profile = await prisma.user.findFirst({
                where: {
                    userId: user.sub
                }
            });
            return res.render("profile/myUser", { profile });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
}
exports.default = ProfileController;
