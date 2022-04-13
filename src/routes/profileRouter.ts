
import express  from "express";
import ProfileController from "../controllers/profileController";
import passport from "passport";

const profileRouter = express.Router()

profileRouter.get('/my-posts', passport.authenticate('jwt', {session: false}), ProfileController.getProfile);

export default profileRouter;
