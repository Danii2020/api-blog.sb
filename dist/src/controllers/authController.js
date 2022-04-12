"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const token_1 = require("../../utils/auth/token/token");
const config_1 = require("../../config/config");
const prisma = new client_1.PrismaClient();
const jwtConfig = {
    expiresIn: '5d'
};
class AuthController {
    static async login(req, res, next) {
        try {
            const user = req.user;
            const payload = {
                sub: user.userId,
                role: user.role
            };
            const token = (0, token_1.signToken)(payload, config_1.config.jwtSecret, jwtConfig);
            res.json({
                user,
                token
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
