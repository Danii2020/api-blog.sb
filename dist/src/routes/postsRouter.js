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
postsRouter.get('/:id', postsController_1.default.getOnePost);
postsRouter.post('/', passport_1.default.authenticate('jwt', { session: false }), authHandler_1.checkAdminRole, postsController_1.default.postPost);
postsRouter.patch('/:id', passport_1.default.authenticate('jwt', { session: false }), postsController_1.default.patchPost);
postsRouter.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), postsController_1.default.deletePost);
exports.default = postsRouter;
