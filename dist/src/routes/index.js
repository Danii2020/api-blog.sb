"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApi = void 0;
const express_1 = __importDefault(require("express"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const postsRouter_1 = __importDefault(require("./postsRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const profileRouter_1 = __importDefault(require("./profileRouter"));
const viewRouter_1 = __importDefault(require("./viewRouter"));
const routerApi = (app) => {
    const router = express_1.default.Router();
    const routerView = express_1.default.Router();
    app.use('/api/v1', router);
    app.use('/view', routerView);
    router.use('/users', usersRouter_1.default);
    router.use('/posts', postsRouter_1.default);
    router.use('/auth', authRouter_1.default);
    router.use('/profile', profileRouter_1.default);
    routerView.use('/auth', viewRouter_1.default);
};
exports.routerApi = routerApi;
