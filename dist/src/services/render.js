"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
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
}
