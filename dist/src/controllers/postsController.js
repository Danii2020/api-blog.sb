"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
class PostsController {
    static async getAllPosts(req, res) {
        try {
            const post = await prisma.post.findMany({
                include: {
                    user: {
                        select: { username: true }
                    }
                }
            });
            return res.status(200).json({
                data: post
            });
        }
        catch (error) {
            console.log(error);
            boom_1.default.internal("Internal server error");
        }
    }
    static async getOnePost(req, res, next) {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    postId: Number(req.params.id)
                },
                include: {
                    user: {
                        select: { username: true }
                    }
                }
            });
            if (!post) {
                next(boom_1.default.notFound("Post not found"));
            }
            return res.status(200).json({
                data: post
            });
        }
        catch (error) {
            console.log(error);
            boom_1.default.internal("Internal server error");
        }
    }
    static async postPost(req, res) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    userId: req?.user?.sub
                }
            });
            if (!user) {
                boom_1.default.notFound("User not found");
            }
            const newPost = await prisma.post.create({
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    user: {
                        connect: { userId: user.userId }
                    }
                }
            });
            return res.status(200).json({
                message: "Post created",
                data: newPost
            });
        }
        catch (error) {
            console.log(error);
            boom_1.default.internal("Internal server error");
        }
    }
    static async patchPost(req, res) {
        try {
            const updatedPost = await prisma.post.update({
                where: {
                    postId: Number(req.params.id)
                },
                data: {
                    title: req.body.title,
                    content: req.body.content
                }
            });
            if (!updatedPost) {
                boom_1.default.notFound("Post not found");
            }
            return res.status(201).json({
                message: "Post updated",
                data: updatedPost
            });
        }
        catch (error) {
            console.log(error);
            boom_1.default.internal("Internal server error");
        }
    }
    static async deletePost(req, res) {
        try {
            const post = await prisma.post.delete({
                where: {
                    postId: Number(req.params.id)
                }
            });
            if (!post) {
                boom_1.default.notFound("Post not found");
            }
            return res.status(200).json({
                message: "Post deleted",
                data: post
            });
        }
        catch (error) {
            console.log(error);
            boom_1.default.internal("Internal server error");
        }
    }
}
exports.default = PostsController;
