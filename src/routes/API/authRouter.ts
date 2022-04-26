
import express  from "express";
import AuthController from "./../../controllers/API/authController";
import passport from "passport";
const authRouterApi = express.Router()

authRouterApi.post('/signup', AuthController.signUp);
authRouterApi.post('/login', passport.authenticate('local', {session:false}), AuthController.login);

export default authRouterApi;
