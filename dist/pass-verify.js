"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
async function verufyPassword() {
    const myPassword = 'admin123';
    const hash = '$2b$10$P0tDf7plX4mbs/elXIL5zuMH1Zrv3pM7NEk77qwGR.u7Z/yOGutPS';
    const isMatch = await bcrypt_1.default.compare(myPassword, hash);
    console.log(isMatch);
}
verufyPassword();
