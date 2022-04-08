"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
class PostsService {
    constructor() {
        this._posts = [];
        this.generate();
    }
    generate() {
        const limit = 10;
        for (let i = 0; i < limit; i++) {
            this._posts.push({
                id: String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
                userId: String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
                title: "Post Example",
                content: "This is an example"
            });
        }
    }
    async find() {
        return this._posts;
    }
    async findOne(id) {
        const post = this._posts.find(item => item.id === id);
        if (!post) {
            throw boom_1.default.notFound('Post not found');
        }
        return post;
    }
    async create(data) {
        const { id = "", userId = "", title = "", content = "" } = data;
        const post = {
            id: String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
            userId: String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
            title,
            content
        };
        this._posts.push(post);
        return post;
    }
    async update(id, changes) {
        const index = this._posts.findIndex(item => item.id === id);
        if (index == -1) {
            throw boom_1.default.notFound('Post not found');
        }
        const post = this._posts[index];
        this._posts[index] = {
            ...post,
            ...changes
        };
        return this._posts[index];
    }
    async delete(id) {
        const index = this._posts.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom_1.default.notFound('Post not found');
        }
        this._posts.splice(index, 1);
        return "Post with id: " + id + " deleted";
    }
}
exports.default = PostsService;
