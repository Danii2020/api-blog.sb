"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = __importDefault(require("./../../controllers/views/profileController"));
const passport_1 = __importDefault(require("passport"));
const profileRouter = express_1.default.Router();
profileRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), profileController_1.default.getMyProfile);
profileRouter.get('/my-posts', passport_1.default.authenticate('jwt', { session: false }), profileController_1.default.getPosts);
profileRouter.get('/new-post', passport_1.default.authenticate('jwt', { session: false }), profileController_1.default.getNewPost);
exports.default = profileRouter;
