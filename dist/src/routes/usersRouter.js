"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const authHandler_1 = require("../middlewares/authHandler");
const passport_1 = __importDefault(require("passport"));
const postsController_1 = __importDefault(require("../controllers/postsController"));
const profileController_1 = __importDefault(require("../controllers/profileController"));
const usersRouter = express_1.default.Router();
usersRouter.get('/', usersController_1.default.getAllUsers);
usersRouter.get('/sortbyalpha', usersController_1.default.getSortedUsers);
usersRouter.get('/abcnames', usersController_1.default.getABCNames);
usersRouter.get('/countabc', usersController_1.default.getABCCount);
usersRouter.get('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), usersController_1.default.getOneUser);
usersRouter.get('/:id/posts', postsController_1.default.getPostsByUser);
usersRouter.get('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), profileController_1.default.getNewProfile);
usersRouter.post('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.patchUser);
usersRouter.get('/delete/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), usersController_1.default.deleteUser);
exports.default = usersRouter;
