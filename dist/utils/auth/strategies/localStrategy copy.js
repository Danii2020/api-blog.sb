"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const usersService_1 = __importDefault(require("../../../src/services/usersService"));
const hash_1 = require("../hash/hash");
const boom_1 = __importDefault(require("@hapi/boom"));
const LocalStrategy = new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await usersService_1.default.findByEmail(email);
        if (!user) {
            done(boom_1.default.unauthorized(), false);
        }
        const isMatch = await (0, hash_1.compareHash)(user?.password, password);
        if (!isMatch) {
            done(boom_1.default.unauthorized(), false);
        }
        delete user?.password;
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
});
exports.LocalStrategy = LocalStrategy;
