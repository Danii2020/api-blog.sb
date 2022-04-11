"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data_1 = require("./data");
const prisma = new client_1.PrismaClient();
async function main() {
    for (let user of data_1.users) {
        await prisma.user.create({
            data: user
        });
    }
    for (let post of data_1.posts) {
        await prisma.post.create({
            data: post
        });
    }
}
main().catch(error => {
    console.log(error);
}).finally(() => {
    prisma.$disconnect;
});
