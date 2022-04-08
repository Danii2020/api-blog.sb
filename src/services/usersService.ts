
import { IUser } from './models/interfaces/interfaces';
import PostsService from './postsService';
import boom from '@hapi/boom';

const service = new PostsService();

class UsersService {
  private _users:IUser[];
  constructor() {
    this._users = [];
    this.generate();
  }

  async generate() {
    const limit:number = 10;
    for (let i=0; i<limit; i++) {
      this._users.push({
        id:String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
        username:"danii2020",
        firstname:"Daniel",
        lastname:"Erazo",
        email:"danii2020@gmail.com",
        posts: await service.find()
      })
    }
  }

  async find():Promise<IUser[]> {
    return this._users;
  }

  async findOne(id:string):Promise<IUser> {
    const user = this._users.find(item => item.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async create(data:IUser):Promise<IUser> {
    const {username="", firstname="", lastname="", email="", posts=[]} = data;
    const user:IUser =  {
      id:String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
      username,
      firstname,
      lastname,
      email,
      posts
    }
    this._users.push(user);
    return user;
  }

  async update(id:string, changes:IUser):Promise<IUser> {
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

  async delete(id:string):Promise<string> {
    const index = this._users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this._users.splice(index, 1);
    return "User with id: " + id + " deleted";
  }

}

export default UsersService;
