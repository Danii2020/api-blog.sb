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
    static async findABCNames() {
        const users = await prisma.user.findMany();
        const abcUsers = users.filter(user => user.firstname[0].toLowerCase() === 'a' ||
            user.firstname[0].toLowerCase() === 'b' ||
            user.firstname[0].toLowerCase() === 'c');
        abcUsers.map(user => delete user.password);
        return abcUsers;
    }
    static async countNames(letter) {
        const abcNames = await UserService.findABCNames();
        const count = abcNames.filter(user => user.firstname[0].toLowerCase() === letter)
            .reduce((sum, user) => sum + 1, 0);
        return count;
    }
    static async countABCNames() {
        const aCounter = await this.countNames('a');
        const bCounter = await this.countNames('b');
        const cCounter = await this.countNames('c');
        return {
            aNames: aCounter,
            bNames: bCounter,
            cNames: cCounter
        };
    }
}
exports.default = UserService;
