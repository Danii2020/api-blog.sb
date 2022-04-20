"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
class PostsController {
    static async getAllPosts(req, res, next) {
        try {
            const post = await prisma.post.findMany({
                include: {
                    user: {
                        select: { userId: true, username: true }
                    }
                }
            });
            return res.render("index", { posts: post });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
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
            return res.render("posts/updatePost", { post: post });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async getPostsByUser(req, res, next) {
        console.log(req.params.id);
        try {
            const post = await prisma.post.findMany({
                where: {
                    authorId: Number(req.params.id)
                }
            });
            if (!post) {
                next(boom_1.default.notFound("Post not found"));
            }
            return res.render("posts/userPost", { posts: post });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async postPost(req, res, next) {
        try {
            const userReq = req.user;
            const user = await prisma.user.findUnique({
                where: {
                    userId: userReq.sub
                }
            });
            if (!user) {
                next(boom_1.default.notFound("User not found"));
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
            return res.redirect("/view/profile/my-posts");
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async patchPost(req, res, next) {
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
            return res.status(201).json({
                message: "Post updated",
                data: updatedPost
            });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async deletePost(req, res, next) {
        try {
            const post = await prisma.post.delete({
                where: {
                    postId: Number(req.params.id)
                }
            });
            console.log(post);
            return res.status(200).json({
                message: "Post deleted",
                data: post
            });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.notFound("Post not found"));
        }
    }
}
exports.default = PostsController;
