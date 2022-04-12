import passport from "passport";
import { LocalStrategy } from './strategies/localStrategy';
import { JwtStrategy } from './strategies/jwtStrategy';

passport.use(LocalStrategy);
passport.use(JwtStrategy);
