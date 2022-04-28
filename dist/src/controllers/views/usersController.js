"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const usersService_1 = __importDefault(require("./../../services/usersService"));
const userService = new usersService_1.default();
class UsersController {
    static async getAllUsers(req, res, next) {
        try {
            const userReq = req.user;
            console.log(userReq);
            const users = await userService.getAllUsers();
            users.map(user => (delete user.password, delete user.role));
            return res.status(200).render("users/usersList", { users: users, userReq: userReq });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internar server error"));
        }
    }
    static async getOneUser(req, res, next) {
        try {
            const id = Number(req.params.id);
            const user = await userService.getOneUser(id);
            if (!user) {
                next(boom_1.default.notFound("User not found"));
            }
            delete user.role;
            delete user.password;
            return res.status(200).render("users/userProfile", { user: user });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Internar server error"));
        }
    }
    static async patchUser(req, res, next) {
        try {
            if ('_method' in req.body) {
                delete req.body._method;
            }
            const id = Number(req.params.id);
            const changes = req.body;
            const updatedUser = await userService.patchUser(id, changes);
            return res.status(201).redirect('/view/profile/');
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.notFound("User not found"));
        }
    }
    static async deleteUser(req, res, next) {
        try {
            const id = Number(req.params.id);
            const user = await userService.deleteUser(id);
            return res.status(200).redirect('/');
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.notFound("User not found"));
        }
    }
    static async getSortedUsers(req, res, next) {
        try {
            const users = await userService.getSortedUsers();
            if (!users) {
                next(boom_1.default.notFound("Users not found"));
            }
            return res.status(200).render("users/sortedUsers", { users: users });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Server error"));
        }
    }
    static async getABCNames(req, res, next) {
        try {
            const abcNames = await userService.getABCNames();
            if (!abcNames) {
                next(boom_1.default.notFound("Users not found"));
            }
            return res.status(200).render("users/sortedUsers", { users: abcNames });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Server error"));
        }
    }
    static async getABCCount(req, res, next) {
        try {
            const abcCount = await userService.getCountABCNames();
            if (!abcCount) {
                next(boom_1.default.notFound("Users not found"));
            }
            return res.status(200).render("users/abcCount", { data: abcCount });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Server error"));
        }
    }
}
exports.default = UsersController;
