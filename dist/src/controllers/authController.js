"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../services/authService"));
class AuthController {
    static async login(req, res, next) {
        try {
            const user = req.user;
            res.json(authService_1.default.signToken(user));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
