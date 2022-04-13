"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PostsService {
    static async findByUser(userId) {
        const posts = await prisma.post.findMany({
            where: {
                user: {
                    userId: userId
                }
            }
        });
        return posts;
    }
}
exports.default = PostsService;
