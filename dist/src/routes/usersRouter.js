"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const client_1 = require("@prisma/client");
const authHandler_1 = require("../middlewares/authHandler");
const passport_1 = __importDefault(require("passport"));
const prisma = new client_1.PrismaClient();
const usersRouter = express_1.default.Router();
usersRouter.get('/', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.getAllUsers);
usersRouter.get('/sortbyalpha', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.getSortedUsers);
usersRouter.get('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.getOneUser);
usersRouter.patch('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin", "user"), usersController_1.default.patchUser);
usersRouter.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), (0, authHandler_1.checkRoles)("admin"), usersController_1.default.deleteUser);
exports.default = usersRouter;
