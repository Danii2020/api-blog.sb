
import express  from "express";
import AuthController from "../controllers/authController";
import passport from "passport";
const authRouter = express.Router()

authRouter.post('/signup', AuthController.signUp);
authRouter.post('/login', passport.authenticate('local', {session:false}), AuthController.login);

export default authRouter;
