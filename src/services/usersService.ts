import { PrismaClient, User } from '@prisma/client';
import {IUserService, IUserChanges, IUser} from '../models/userInterface';
import UsersHelper from '../helpers/usersHelper';

const usersHelper  = new UsersHelper();
const prisma = new PrismaClient();

class UserService implements IUserService{
  async getAllUsers() {
    const users = <IUser[]> await prisma.user.findMany();
    return users
  }

  async getOneUser(id:number) {
    const user = <IUser> await prisma.user.findUnique({
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
    const updatedUser = <IUser> await prisma.user.update({
      where : {
        userId: id
      },
      data : changes
    });
    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = <IUser> await prisma.user.delete({
      where: {
        userId: id,
      }
    });
    return user;
  }
  async getUserByEmail(email:string) {
    const user = <IUser> await prisma.user.findUnique({
      where: { email:email}
    });
    return user;
  }

  async getSortedUsers() {
    const users = <IUser[]> await prisma.user.findMany();
    const sortedUsers = usersHelper.sortUsersUpperLastname(users);
    return sortedUsers;
  }

  async getABCNames() {
    const users = <IUser[]> await prisma.user.findMany();
    const abcNames = usersHelper.findABCNames(users);
    return abcNames;
  }

  async getCountABCNames() {
    const abcNames = <IUser[]> await this.getABCNames();
    const abcNamesCounter = usersHelper.countABCNames(abcNames);
    return abcNamesCounter;
  }
}

export default UserService;
