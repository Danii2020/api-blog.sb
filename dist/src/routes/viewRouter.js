"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const viewRouter = express_1.default.Router();
viewRouter.get('/signup', authController_1.default.getSignUp);
viewRouter.get('/login', authController_1.default.getLogin);
exports.default = viewRouter;
