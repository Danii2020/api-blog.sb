
import express  from "express";
import AuthController from "../controllers/authController";
const viewRouter = express.Router()

viewRouter.get('/signup', AuthController.getSignUp);
viewRouter.get('/login', AuthController.getLogin);

export default viewRouter;
