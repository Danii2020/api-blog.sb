"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = __importDefault(require("./../../controllers/API/postsController"));
const authHandler_1 = require("../../middlewares/authHandler");
const passport_1 = __importDefault(require("passport"));
const postsRouterApi = express_1.default.Router();
postsRouterApi.get('/', postsController_1.default.getAllPosts);
postsRouterApi.get('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), postsController_1.default.getOnePost);
postsRouterApi.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), postsController_1.default.postPost);
postsRouterApi.patch('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), postsController_1.default.patchPost);
postsRouterApi.delete('/delete/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), postsController_1.default.deletePost);
exports.default = postsRouterApi;
