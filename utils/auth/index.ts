import passport from "passport";
import { LocalStrategy } from './strategies/localStrategy';

passport.use(LocalStrategy);
