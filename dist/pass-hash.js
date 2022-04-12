"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hashPassword() {
    const myPassword = 'admin123';
    const hash = await bcrypt_1.default.hash(myPassword, 10);
    console.log(hash);
}
hashPassword();
