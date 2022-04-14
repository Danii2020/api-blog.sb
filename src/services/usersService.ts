import { PrismaClient } from '@prisma/client';
import { IUser } from '../models/interfaces';
import boom from '@hapi/boom';

const prisma = new PrismaClient();

class UserService {
  public static async findByEmail(email:string):Promise<IUser> {
    const user = <IUser> await prisma.user.findUnique({
      where: { email:email}
    });
    return user;
  }

  public static async findABCNames():Promise<IUser[]> {
    const users = <IUser[]> await prisma.user.findMany();
    const abcUsers = users.filter(user =>
      user.firstname[0].toLowerCase() === 'a' ||
      user.firstname[0].toLowerCase() === 'b' ||
      user.firstname[0].toLowerCase() === 'c');
    abcUsers.map(user => delete user.password);
    return abcUsers;
  }

  private static async countNames(letter:string):Promise<number> {
    const abcNames:IUser[] = await UserService.findABCNames();
    const count:number = abcNames.filter(user => user.firstname[0].toLowerCase() === letter)
      .reduce((sum, user) => sum + 1,0);
    return count;
  }

  public static async countABCNames():Promise<object> {
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
