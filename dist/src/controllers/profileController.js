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
            const userReq = req.user;
            const user = await prisma.user.findFirst({
                where: {
                    userId: userReq.sub
                }
            });
            return res.render("profile/myUser", { user: user, postUrl: '/view/profile/my-posts' });
        }
        catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    }
    static async getPostsByUser(req, res, next) {
        try {
            const post = await prisma.post.findMany({
                where: {
                    authorId: Number(req.params.id)
                }
            });
            if (!post) {
                next(boom_1.default.notFound("Post not found"));
            }
            return res.render("profile/userPost", { post: post });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
}
exports.default = ProfileController;
