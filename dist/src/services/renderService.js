"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const URL = 'http://localhost:3000/api/v1';
class RenderService {
    static async fetchData(api_url) {
        try {
            const response = await axios_1.default.get(api_url);
            return response.data;
        }
        catch (err) {
            throw (err);
        }
    }
    static async renderPosts(req, res, next) {
        try {
            const posts = await axios_1.default.get(URL + '/posts');
            console.log(posts.data.data);
            res.render('posts', { posts: posts.data.data });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = RenderService;
