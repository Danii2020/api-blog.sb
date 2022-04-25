"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = __importDefault(require("../controllers/postsController"));
const authHandler_1 = require("../middlewares/authHandler");
const passport_1 = __importDefault(require("passport"));
const postsRouter = express_1.default.Router();
postsRouter.get('/', postsController_1.default.getAllPosts);
postsRouter.get('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), postsController_1.default.getOnePost);
postsRouter.post('/', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), postsController_1.default.postPost);
postsRouter.post('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), postsController_1.default.patchPost);
postsRouter.get('/delete/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), postsController_1.default.deletePost);
exports.default = postsRouter;
