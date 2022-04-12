
import express  from "express";
import AuthController from "../controllers/authController";
import passport from "passport";
const authRouter = express.Router()

authRouter.post('/login', passport.authenticate('local', {session:false}), AuthController.login);

export default authRouter;
