import {IUser} from './../models/userInterface';

interface IAuthService {
  getUser(email:string, password:string):Promise<IUser | null>;
  signToken(user:IUser):string;
  signUp(body:IUser):Promise<IUser>;
}

export default IAuthService;
