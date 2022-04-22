
import express  from "express";
import AuthController from "../controllers/authController";
import passport from "passport";
const authRouter = express.Router()

authRouter.get('/signup', AuthController.getSignUp);
authRouter.get('/login', AuthController.getLogin);

authRouter.post('/signup', AuthController.signUp);
authRouter.post('/login', passport.authenticate('local', {session:false}), AuthController.login);
authRouter.get('/logout', AuthController.getLogout);

export default authRouter;
