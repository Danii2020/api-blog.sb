"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const boom_1 = __importDefault(require("@hapi/boom"));
class HelperFunctions {
    static async fetchData(url, method, body) {
        try {
            const response = await (0, node_fetch_1.default)(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    cookie: `jwt=${this.cookieExtractor}`
                },
                body: JSON.stringify(body)
            });
            return {
                data: await response.json(),
                ok: response.ok
            };
        }
        catch (error) {
            boom_1.default.internal("Internal server error");
        }
    }
    static async deletePost(postId) {
        const response = await this.fetchData(`/view/posts/delete/${postId}`, "DELETE");
        if (!response.ok)
            return boom_1.default.internal("Internal server error");
    }
    static hello() {
        return console.log("param");
    }
    static cookieExtractor(req) {
        let token = null;
        if (req && req.cookies)
            token = req.cookies['jwt'];
        return token;
    }
}
exports.default = HelperFunctions;
