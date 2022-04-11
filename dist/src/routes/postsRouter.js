"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = __importDefault(require("../controllers/postsController"));
const postsRouter = express_1.default.Router();
postsRouter.get('/', postsController_1.default.getAllPosts);
postsRouter.get('/:id', postsController_1.default.getOnePost);
postsRouter.post('/', postsController_1.default.postPost);
postsRouter.patch('/:id', postsController_1.default.patchPost);
postsRouter.delete('/:id', postsController_1.default.deletePost);
exports.default = postsRouter;
