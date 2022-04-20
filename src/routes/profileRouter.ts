
import express  from "express";
import ProfileController from "../controllers/profileController";
import passport from "passport";

const profileRouter = express.Router()

profileRouter.get('/', passport.authenticate('jwt', {session: false}), ProfileController.getMyProfile);

profileRouter.get('/my-posts', passport.authenticate('jwt', {session: false}), ProfileController.getPosts);

profileRouter.get('/new-post', passport.authenticate('jwt', {session: false}), ProfileController.getNewPost);

export default profileRouter;
