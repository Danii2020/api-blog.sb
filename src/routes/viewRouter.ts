
import express  from "express";
import AuthController from "../controllers/authController";
import ViewController from "../controllers/viewController";
import ProfileController from "../controllers/profileController";
import PostsController from "../controllers/postsController";
import passport from "passport";
const viewRouter = express.Router()

viewRouter.get('/signup', ViewController.getSignUp);
viewRouter.get('/login', ViewController.getLogin);

viewRouter.get('/new-post', passport.authenticate('jwt', {session: false}), ViewController.getNewPost);
viewRouter.get('/my-posts', passport.authenticate('jwt', {session: false}), ProfileController.getProfile);
viewRouter.get('/', PostsController.getAllPosts);

export default viewRouter;
