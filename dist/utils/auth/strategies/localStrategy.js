"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const authService_1 = __importDefault(require("../../../src/services/authService"));
const LocalStrategy = new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await authService_1.default.getUser(email, password);
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
});
exports.LocalStrategy = LocalStrategy;
