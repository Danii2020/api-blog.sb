"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const prisma = new client_1.PrismaClient();
class ViewController {
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
    static async getNewPost(req, res, next) {
        try {
            res.render("posts/newPost");
        }
        catch (error) {
            next(boom_1.default.internal("Internal server error"));
        }
    }
}
exports.default = ViewController;
