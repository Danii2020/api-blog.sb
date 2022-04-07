
import { IUser } from './models/interfaces/users';
import boom from '@hapi/boom';

export class UsersService {
  private _users:IUser[];
  constructor() {
    this._users = [];
    this.generate();
  }

  generate() {
    const limit:number = 10;
    for (let i=0; i<limit; i++) {
      this._users.push({
        id:Math.floor(Math.random() * (10 - 1 + 1) + 1),
        username:"danii2020",
        firstname:"Daniel",
        lastname:"Erazo",
        email:"danii2020@gmail.com"
      })
    }
  }

  find():Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this._users);
      }, 3000);
    });
  }

  async findOne(id:number):Promise<IUser> {
    const user = this._users.find(item => item.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(data:IUser):Promise<IUser> {
    const {username="", firstname="", lastname="", email=""} = data;
    const user:IUser =  {
      id:Math.floor(Math.random() * (10 - 1 + 1) + 1),
      username,
      firstname,
      lastname,
      email
    }
    this._users.push(user);
    return user;
  }

  async update(id:number, changes:IUser):Promise<IUser> {
    const index:number = this._users.findIndex(item => item.id === id);
    if (index == -1) {
      throw boom.notFound('User not found');
    }
    const user:IUser = this._users[index];
    this._users[index] = {
      ...user,
      ...changes
    }
    return this._users[index];
  }

  async delete(id:number):Promise<string> {
    const index = this._users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this._users.splice(index, 1);
    return "User with id: " + id + " deleted";
  }

}
