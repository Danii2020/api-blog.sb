import { Strategy } from "passport-local";
import UserService from "../../../src/services/usersService";
import { compareHash } from "../hash/hash";
import boom from '@hapi/boom';

const LocalStrategy = new Strategy({
  usernameField:"email",
  passwordField: "password"
},
  async (email:string, password:string, done) =>{
  try {
    const user = await UserService.findByEmail(email);
    if (!user) {
      done(boom.unauthorized(), false);
    }
    const isMatch:boolean = await compareHash(user?.password, password);
    if (!isMatch) {
      done(boom.unauthorized(), false);
    }
    delete user?.password;
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export { LocalStrategy }
