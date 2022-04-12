import { Strategy, ExtractJwt } from "passport-jwt";
import UserService from "../../../src/services/usersService";
import { compareHash } from "../hash/hash";
import boom from '@hapi/boom';
import { config } from "../../../config/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload:object, done) => {
  return done(null, payload);
});

export {JwtStrategy}
