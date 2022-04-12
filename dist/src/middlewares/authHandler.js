"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkApiKey = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const config_1 = require("../../config/config");
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['api'];
    (apiKey === config_1.config.apiKey)
        ? next()
        : next(boom_1.default.unauthorized());
};
exports.checkApiKey = checkApiKey;
