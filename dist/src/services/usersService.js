"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postsService_1 = __importDefault(require("./postsService"));
const boom_1 = __importDefault(require("@hapi/boom"));
const service = new postsService_1.default();
class UsersService {
    constructor() {
        this._users = [];
        this.generate();
    }
    async generate() {
        const limit = 10;
        for (let i = 0; i < limit; i++) {
            this._users.push({
                id: String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
                username: "danii2020",
                firstname: "Daniel",
                lastname: "Erazo",
                email: "danii2020@gmail.com",
                posts: await service.find()
            });
        }
    }
    async find() {
        return this._users;
    }
    async findOne(id) {
        const user = this._users.find(item => item.id === id);
        if (!user) {
            throw boom_1.default.notFound('User not found');
        }
        return user;
    }
    async create(data) {
        const { username = "", firstname = "", lastname = "", email = "", posts = [] } = data;
        const user = {
            id: String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
            username,
            firstname,
            lastname,
            email,
            posts
        };
        this._users.push(user);
        return user;
    }
    async update(id, changes) {
        const index = this._users.findIndex(item => item.id === id);
        if (index == -1) {
            throw boom_1.default.notFound('User not found');
        }
        const user = this._users[index];
        this._users[index] = {
            ...user,
            ...changes
        };
        return this._users[index];
    }
    async delete(id) {
        const index = this._users.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom_1.default.notFound('User not found');
        }
        this._users.splice(index, 1);
        return "User with id: " + id + " deleted";
    }
}
exports.default = UsersService;
