"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserService {
    static async findByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        return user;
    }
}
exports.default = UserService;
