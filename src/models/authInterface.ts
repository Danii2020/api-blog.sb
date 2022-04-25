import {User} from '@prisma/client'

interface IAuthService {
  getUser(email:string, password:string):Promise<User>;
  signToken(user:User):string;
  signUp(body:User):Promise<User>;
}

export default IAuthService;
