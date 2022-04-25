"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PostService {
    async getAllPosts() {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: { userId: true, username: true }
                }
            }
        });
        return posts;
    }
    async getOnePost(id) {
        const post = await prisma.post.findUnique({
            where: {
                postId: id
            },
            include: {
                user: {
                    select: { username: true }
                }
            }
        });
        return post;
    }
    async createPost(body, user) {
        const newPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                user: {
                    connect: { userId: user.userId }
                }
            }
        });
        return newPost;
    }
    async patchPost(id, changes) {
        const updatedPost = await prisma.post.update({
            where: {
                postId: id
            },
            data: changes
        });
        return updatedPost;
    }
    async deletePost(id) {
        const post = await prisma.post.delete({
            where: {
                postId: id
            }
        });
        return post;
    }
    async getPostsByUser(id) {
        const posts = await prisma.post.findMany({
            where: {
                authorId: id
            },
            include: {
                user: {
                    select: { firstname: true }
                }
            }
        });
        return posts;
    }
}
exports.default = PostService;
