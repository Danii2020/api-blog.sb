"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const boom_1 = __importDefault(require("@hapi/boom"));
const usersService_1 = __importDefault(require("../services/usersService"));
const prisma = new client_1.PrismaClient();
class UsersController {
    static async getAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();
            users.map(user => delete user.password);
            users.map(user => delete user.role);
            console.log(users);
            return res.status(200).render("users/usersList", { users: users });
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async getOneUser(req, res, next) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    userId: Number(req.params.id)
                },
                include: {
                    posts: true
                }
            });
            if (!user) {
                next(boom_1.default.notFound("User not found"));
            }
            delete user.password;
            delete user.role;
            console.log(user);
            return res.status(200).render("users/userProfile", { user: user });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Server error"));
        }
    }
    static async patchUser(req, res, next) {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    userId: Number(req.params.id)
                },
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
            });
            delete updatedUser.password;
            return res.status(201).redirect('/view/profile/');
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.notFound("User not found"));
        }
    }
    static async deleteUser(req, res, next) {
        try {
            const user = await prisma.user.delete({
                where: {
                    userId: Number(req.params.id),
                }
            });
            delete user.password;
            return res.status(200).redirect('/');
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.notFound("User not found"));
        }
    }
    static async getSortedUsers(req, res, next) {
        try {
            const users = await prisma.user.findMany();
            if (!users) {
                next(boom_1.default.notFound("Users not found"));
            }
            const orderedUsers = users.sort((a, b) => {
                return a.firstname === b.firstname ? 0 : a.firstname > b.firstname ? 1 : -1;
            });
            const upperUsers = orderedUsers.map(user => ({
                firstname: user.firstname,
                lastname: user.lastname.toUpperCase(),
                username: user.username,
                email: user.email
            }));
            return res.status(200).render("users/sortedUsers", { users: upperUsers });
        }
        catch (error) {
            console.log(error);
            next(boom_1.default.internal("Server error"));
        }
    }
    static async getABCNames(req, res, next) {
        try {
            const abcNames = await usersService_1.default.findABCNames();
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
            const abcCount = await usersService_1.default.countABCNames();
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
