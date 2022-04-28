"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const usersHelper_1 = __importDefault(require("../helpers/usersHelper"));
const usersHelper = new usersHelper_1.default();
const prisma = new client_1.PrismaClient();
class UserService {
    async getAllUsers() {
        const users = await prisma.user.findMany();
        return users;
    }
    async getOneUser(id) {
        const user = await prisma.user.findUnique({
            where: {
                userId: id
            },
            include: {
                posts: true
            }
        });
        return user;
    }
    async patchUser(id, changes) {
        const updatedUser = await prisma.user.update({
            where: {
                userId: id
            },
            data: changes
        });
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await prisma.user.delete({
            where: {
                userId: id,
            }
        });
        return user;
    }
    async getUserByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        return user;
    }
    async getSortedUsers() {
        const users = await prisma.user.findMany();
        const sortedUsers = usersHelper.sortUsersUpperLastname(users);
        return sortedUsers;
    }
    async getABCNames() {
        const users = await prisma.user.findMany();
        const abcNames = usersHelper.findABCNames(users);
        return abcNames;
    }
    async getCountABCNames() {
        const abcNames = await this.getABCNames();
        const abcNamesCounter = usersHelper.countABCNames(abcNames);
        return abcNamesCounter;
    }
}
exports.default = UserService;
