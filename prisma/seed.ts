import { PrismaClient } from "@prisma/client";
import { users, posts } from './data';

const prisma = new PrismaClient();

async function main() {
  for (let user of users) {
    await prisma.user.create({
      data:user
    });
  }

  for (let post of posts) {
    await prisma.post.create({
      data:post
    });
  }
}

main().catch(error => {
  console.log(error);
}).finally(() => {
  prisma.$disconnect
});
