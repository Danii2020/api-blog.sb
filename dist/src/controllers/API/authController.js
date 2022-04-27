"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("./../../services/authService"));
const boom_1 = __importDefault(require("@hapi/boom"));
const authService = new authService_1.default();
class AuthController {
    static async signUp(req, res, next) {
        try {
            const body = req.body;
            const newUser = await authService.signUp(body);
            return res.status(200).json({
                message: "User created",
                data: newUser
            });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Server error"));
        }
    }
    static async login(req, res, next) {
        try {
            const user = req.user;
            const token = authService.signToken(user);
            res.status(200).cookie('jwt', token, {
                httpOnly: true,
                secure: true
            }).json({
                data: user,
                token: token
            });
            delete user.password;
        }
        catch (error) {
            next(boom_1.default.internal("Server error"));
        }
    }
}
exports.default = AuthController;
