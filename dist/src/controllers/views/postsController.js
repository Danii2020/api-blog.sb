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
class PostsController {
    static async getAllPosts(req, res, next) {
        try {
            const posts = await postService.getAllPosts();
            return res.render("index", { posts: posts });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async getOnePost(req, res, next) {
        try {
            const id = Number(req.params.id);
            const post = await postService.getOnePost(id);
            if (!post) {
                next(boom_1.default.notFound("Post not found"));
            }
            return res.status(200).render("posts/updatePost", { post: post });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async getPostsByUser(req, res, next) {
        try {
            const userReq = req.user;
            console.log(userReq);
            const id = Number(req.params.id);
            const posts = await postService.getPostsByUser(id);
            return res.status(200).render("posts/userPost", { posts: posts, userReq: userReq, userId: id });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async getNewPost(req, res, next) {
        try {
            res.render("posts/newPost", { userId: req.params.id });
        }
        catch (error) {
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async postPost(req, res, next) {
        try {
            const body = req.body;
            const userReq = req.user;
            const user = await prisma.user.findUnique({
                where: {
                    userId: userReq.sub
                }
            });
            if (!user) {
                next(boom_1.default.notFound("User not found"));
            }
            const newPost = await postService.createPost(body, user);
            return res.status(200).redirect("/view/profile/my-posts");
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async postPostByUser(req, res, next) {
        try {
            const body = req.body;
            const userId = Number(req.params.id);
            const user = await prisma.user.findUnique({
                where: {
                    userId: userId
                }
            });
            if (!user) {
                next(boom_1.default.notFound("User not found"));
            }
            const newPost = await postService.createPost(body, user);
            return res.status(200).redirect("/view/profile/my-posts");
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async patchPost(req, res, next) {
        try {
            if ('_method' in req.body) {
                delete req.body._method;
            }
            const id = Number(req.params.id);
            const body = req.body;
            const updatedPost = await postService.patchPost(id, body);
            return res.status(201).redirect('/view/profile/my-posts');
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.notFound("Post not found"));
        }
    }
    static async deletePost(req, res, next) {
        console.log(req);
        try {
            const id = Number(req.params.id);
            const post = await postService.deletePost(id);
            return res.status(200).redirect('/view/profile/my-posts');
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.notFound("Post not found"));
        }
    }
}
exports.default = PostsController;
