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
const jwtConfig = {
    expiresIn: '5d'
};
class AuthService {
    static async getUser(email, password) {
        const user = await usersService_1.default.findByEmail(email);
        if (!user) {
            throw boom_1.default.unauthorized();
        }
        const isMatch = await (0, hash_1.compareHash)(user?.password, password);
        if (!isMatch) {
            throw boom_1.default.unauthorized();
        }
        delete user?.password;
        return user;
    }
    static signToken(user) {
        const payload = {
            sub: user.userId,
            role: user.role
        };
        const token = jsonwebtoken_1.default.sign(payload, config_1.config.jwtSecret, jwtConfig);
        return {
            user,
            token
        };
    }
}
exports.default = AuthService;
