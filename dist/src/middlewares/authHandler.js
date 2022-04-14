"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const checkRoles = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        (roles.includes(user.role))
            ? next()
            : next(boom_1.default.forbidden("You don't have permission to access to this resource"));
    };
};
exports.checkRoles = checkRoles;
