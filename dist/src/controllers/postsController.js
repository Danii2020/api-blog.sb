"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PostsController {
    static async getAllPosts(req, res) {
        try {
            const post = await prisma.post.findMany({
                include: {
                    user: true
                }
            });
            return res.status(200).json({
                data: post
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async getOnePost(req, res) {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    postId: Number(req.params.id)
                },
                include: {
                    user: true
                }
            });
            if (post === null) {
                res.sendStatus(404);
            }
            return res.status(200).json({
                data: post
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async postPost(req, res) {
        try {
            const newPost = await prisma.post.create({
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    user: {
                        connect: { userId: req.body.user.userId }
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
            res.sendStatus(500);
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
            if (updatedPost === null) {
                res.sendStatus(404);
            }
            return res.status(201).json({
                message: "Post updated",
                data: updatedPost
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async deletePost(req, res) {
        try {
            const post = await prisma.post.delete({
                where: {
                    postId: Number(req.params.id)
                }
            });
            if (post === null) {
                res.sendStatus(404);
            }
            return res.status(200).json({
                message: "Post deleted",
                data: post
            });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
}
exports.default = PostsController;
