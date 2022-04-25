"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../services/authService"));
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
const authService = new authService_1.default();
class AuthController {
    static async getSignUp(req, res, next) {
        try {
            res.render("auth/signup");
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async getLogin(req, res, next) {
        try {
            res.render("auth/login");
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internal server error"));
        }
    }
    static async signUp(req, res, next) {
        try {
            const body = req.body;
            const newUser = await authService.signUp(body);
            return res.redirect('/view/auth/login');
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
            res
                .cookie('jwt', token, {
                httpOnly: true,
                secure: true
            })
                .redirect("/view/profile/");
        }
        catch (error) {
            next(boom_1.default.internal("Server error"));
        }
    }
    static async getLogout(req, res) {
        try {
            res.status(200).clearCookie("jwt", {
                path: "/"
            });
            res.redirect("/");
        }
        catch (error) {
            console.log(error);
            boom_1.default.internal("Server error");
        }
    }
}
exports.default = AuthController;
