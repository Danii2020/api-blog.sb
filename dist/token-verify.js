"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'myCat';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ5NzkxOTkyfQ.Tktpk-UPG_zMTS92beoCnb_Xg6x5OfxYRCAIMIzDShU";
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
const payload = verifyToken(token, secret);
console.log(payload);
