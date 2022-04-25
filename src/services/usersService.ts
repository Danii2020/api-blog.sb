import { PrismaClient, User } from '@prisma/client';
import {IUserService, IUserChanges} from '../models/userInterface';

const prisma = new PrismaClient();

class UserService implements IUserService{
  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users
  }

  async getOneUser(id:number) {
    const user = await prisma.user.findUnique({
      where: {
        userId:id
      },
      include: {
        posts:true
      }
    });
    return user;
  }

  async patchUser(id:number, changes:IUserChanges) {
    const updatedUser = await prisma.user.update({
      where : {
        userId: id
      },
      data : changes
    });
    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = await prisma.user.delete({
      where: {
        userId: id,
      }
    });
    return user;
  }
  async getUserByEmail(email:string) {
    const user = await prisma.user.findUnique({
      where: { email:email}
    });
    return user;
  }

  async getSortedUsers() {
    const users = await prisma.user.findMany();
    const orderedUsers = users.sort((a, b) => {
      return a.firstname === b.firstname ? 0: a.firstname > b.firstname ? 1: -1;
    });
    const upperUsers = orderedUsers.map(user => ({
      firstname:user.firstname,
      lastname:user.lastname.toUpperCase(),
      username:user.username,
      email:user.email
    }));
    return upperUsers;
  }

  async findABCNames() {
    const users = await prisma.user.findMany();
    const abcUsers = users.filter(user =>
      user.firstname[0].toLowerCase() === 'a' ||
      user.firstname[0].toLowerCase() === 'b' ||
      user.firstname[0].toLowerCase() === 'c');
    return abcUsers;
  }

  private async countNames(letter:string){
    const abcNames = await this.findABCNames();
    const count:number = abcNames.filter(user => user.firstname[0].toLowerCase() === letter)
      .reduce((sum, user) => sum + 1,0);
    return count;
  }

  async countABCNames() {
    const aCounter = await this.countNames('a');
    const bCounter = await this.countNames('b');
    const cCounter = await this.countNames('c');
    return {
      aNames: aCounter,
      bNames: bCounter,
      cNames: cCounter
    }
  }
}

export default UserService;
