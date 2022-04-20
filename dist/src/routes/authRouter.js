"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const passport_1 = __importDefault(require("passport"));
const authRouter = express_1.default.Router();
authRouter.get('/signup', authController_1.default.getSignUp);
authRouter.get('/login', authController_1.default.getLogin);
authRouter.post('/signup', authController_1.default.signUp);
authRouter.post('/login', passport_1.default.authenticate('local', { session: false }), authController_1.default.login);
exports.default = authRouter;
