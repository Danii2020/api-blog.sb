import { Strategy } from "passport-local";
import AuthService from "../../../src/services/authService";
import { VerifiedCallback } from "passport-jwt";

const LocalStrategy = new Strategy({
  usernameField:"email",
  passwordField: "password"
},
  async (email:string, password:string, done:VerifiedCallback) =>{
  try {
    const user = await AuthService.getUser(email, password);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export { LocalStrategy }
