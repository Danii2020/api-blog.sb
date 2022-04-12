"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const localStrategy_1 = require("./strategies/localStrategy");
const jwtStrategy_1 = require("./strategies/jwtStrategy");
passport_1.default.use(localStrategy_1.LocalStrategy);
passport_1.default.use(jwtStrategy_1.JwtStrategy);
