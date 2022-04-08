"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
class UsersService {
    constructor() {
        this._users = [];
        this.generate();
    }
    generate() {
        const limit = 10;
        for (let i = 0; i < limit; i++) {
            this._users.push({
                id: String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
                username: "danii2020",
                firstname: "Daniel",
                lastname: "Erazo",
                email: "danii2020@gmail.com"
            });
        }
    }
    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._users);
            }, 3000);
        });
    }
    async findOne(id) {
        const user = this._users.find(item => item.id === id);
        if (!user) {
            throw boom_1.default.notFound('User not found');
        }
        return user;
    }
    async create(data) {
        const { username = "", firstname = "", lastname = "", email = "" } = data;
        const user = {
            id: String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
            username,
            firstname,
            lastname,
            email
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
