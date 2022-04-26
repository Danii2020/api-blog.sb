import { User, Post } from "@prisma/client";

interface IUserService {
  getAllUsers():Promise<IUser[]>;
  getOneUser(id:number):Promise<(IUser & {posts: Post[]}) | null>;
  patchUser(id:number, changes:IUserChanges):Promise<IUser>;
  deleteUser(id:number):Promise<User>;
  getUserByEmail(email:string):Promise<IUser | null>;
  findABCNames():Promise<IUser[]  | null>;
  countABCNames():Promise<object>;
  getSortedUsers():Promise<IUserSorted[]>;
}

interface IUser {
  userId:number;
  firstname:string;
  lastname:string;
  username:string;
  email:string;
  role?:string;
  password?:string;
}

interface IUserChanges {
  firstname:string;
  lastname:string;
  username:string;
  email:string;
  password:string;
}

interface IUserReq {
  sub:number;
  role:string;
  iat:number;
  exp:number;
}

interface IUserSorted {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export { IUserService, IUserReq, IUserChanges, IUser }
