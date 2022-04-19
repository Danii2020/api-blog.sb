"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../services/authService"));
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const argon2_1 = __importDefault(require("argon2"));
const prisma = new client_1.PrismaClient();
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
            const hash = await argon2_1.default.hash(req.body.password, { type: argon2_1.default.argon2id });
            const newUser = await prisma.user.create({
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    role: req.body.role || 'user',
                    posts: req.body.post
                }
            });
            delete newUser.password;
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
            res.json(authService_1.default.signToken(user));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
