"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const authHandler_1 = require("../middlewares/authHandler");
const passport_1 = __importDefault(require("passport"));
const usersRouter = express_1.default.Router();
usersRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.getAllUsers);
usersRouter.get('/sortbyalpha', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.getSortedUsers);
usersRouter.get('/abcnames', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.getABCNames);
usersRouter.get('/countabc', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.getABCCount);
usersRouter.get('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.getOneUser);
usersRouter.patch('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), usersController_1.default.patchUser);
usersRouter.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.deleteUser);
exports.default = usersRouter;
