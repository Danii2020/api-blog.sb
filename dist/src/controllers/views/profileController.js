"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const usersService_1 = __importDefault(require("./../../services/usersService"));
const postService_1 = __importDefault(require("./../../services/postService"));
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
const userService = new usersService_1.default();
const postService = new postService_1.default();
class ProfileController {
    static async getPosts(req, res, next) {
        try {
            const user = req.user;
            const posts = await postService.getPostsByUser(user.sub);
            return res.render("profile/myPosts", { posts: posts });
        }
        catch (error) {
            next(boom_1.default.internal("Internar server error"));
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
            const userReq = req.user;
            const user = await prisma.user.findFirst({
                where: {
                    userId: userReq.sub
                }
            });
            return res.render("profile/myUser", { user: user });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
    static async getNewProfile(req, res, next) {
        try {
            const id = Number(req.params.id);
            const user = await userService.getOneUser(id);
            if (!user) {
                next(boom_1.default.notFound("User not found"));
            }
            return res.status(200).render("profile/updateProfile", { user: user });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Server error"));
        }
    }
}
exports.default = ProfileController;
