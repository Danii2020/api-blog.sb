import { Request } from "express";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { config } from "../../../config/config";

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload:object, done:VerifiedCallback) => {
  return done(null, payload);
});

function cookieExtractor (req:Request):string {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
}

export { JwtStrategy }
