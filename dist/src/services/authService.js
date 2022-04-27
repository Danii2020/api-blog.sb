"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = require("../../utils/auth/hash/hash");
const boom_1 = __importDefault(require("@hapi/boom"));
const usersService_1 = __importDefault(require("./usersService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const argon2_1 = __importDefault(require("argon2"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userService = new usersService_1.default();
const jwtConfig = {
    expiresIn: '5d'
};
class AuthService {
    async signUp(body) {
        const hash = await argon2_1.default.hash(body.password, { type: argon2_1.default.argon2id });
        const newUser = await prisma.user.create({
            data: {
                ...body,
                role: body.role || "user",
                password: hash
            }
        });
        return newUser;
    }
    async getUser(email, password) {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            throw boom_1.default.unauthorized("Your crendentials are bad.");
        }
        const isMatch = await (0, hash_1.compareHash)(user.password, password);
        if (!isMatch) {
            throw boom_1.default.unauthorized("Your crendentials are bad.");
        }
        return user;
    }
    signToken(user) {
        const payload = {
            sub: user.userId,
            role: user.role
        };
        const token = jsonwebtoken_1.default.sign(payload, String(config_1.config.jwtSecret), jwtConfig);
        return token;
    }
}
exports.default = AuthService;
