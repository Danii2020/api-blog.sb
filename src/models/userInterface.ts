interface IUserService {
  getAllUsers():Promise<IUser[]>;
  getOneUser(id:number):Promise<IUser|null>;
  patchUser(id:number, changes:IUserChanges):Promise<IUser>;
  deleteUser(id:number):Promise<IUser>;
  getUserByEmail(email:string):Promise<IUser | null>;
  getABCNames():Promise<IUser[]  | null>;
  getCountABCNames():Promise<object>;
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
