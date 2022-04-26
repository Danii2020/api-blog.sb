
import express  from "express";
import ProfileController from "./../../controllers/API/profileController";
import passport from "passport";

const profileRouterApi = express.Router()

profileRouterApi.get('/', passport.authenticate('jwt', {session: false}), ProfileController.getMyProfile);

profileRouterApi.get('/my-posts', passport.authenticate('jwt', {session: false}), ProfileController.getPosts);

export default profileRouterApi;
