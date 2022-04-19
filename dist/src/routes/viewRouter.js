"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const viewController_1 = __importDefault(require("../controllers/viewController"));
const profileController_1 = __importDefault(require("../controllers/profileController"));
const postsController_1 = __importDefault(require("../controllers/postsController"));
const passport_1 = __importDefault(require("passport"));
const viewRouter = express_1.default.Router();
viewRouter.get('/signup', viewController_1.default.getSignUp);
viewRouter.get('/login', viewController_1.default.getLogin);
viewRouter.get('/new-post', passport_1.default.authenticate('jwt', { session: false }), viewController_1.default.getNewPost);
viewRouter.get('/my-posts', passport_1.default.authenticate('jwt', { session: false }), profileController_1.default.getProfile);
viewRouter.get('/', postsController_1.default.getAllPosts);
exports.default = viewRouter;
