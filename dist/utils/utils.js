"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTOken = exports.compare = exports.hash = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const hash = async (password) => {
    const hash = await argon2_1.default.hash(password, { type: argon2_1.default.argon2id });
    return hash;
};
exports.hash = hash;
const compare = async (hash, password) => {
    return argon2_1.default.verify(hash, password);
};
exports.compare = compare;
const generateTOken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};
exports.generateTOken = generateTOken;
