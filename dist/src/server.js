"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require('express');
const errorHandler_1 = require("./middlewares/errorHandler");
const routes_1 = require("./routes");
const config_1 = require("../config/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const postsController_1 = __importDefault(require("./controllers/postsController"));
const method_override_1 = __importDefault(require("method-override"));
const app = express();
exports.app = app;
console.log(app.locals);
const port = config_1.config.port;
app.use(express.json());
app.use(express.urlencoded());
app.use((0, cookie_parser_1.default)());
require('./../utils/auth');
app.set('view engine', 'pug');
app.set('views', './views');
app.use((0, method_override_1.default)('_method'));
app.get('/', postsController_1.default.getAllPosts);
(0, routes_1.routerApi)(app);
app.use(errorHandler_1.logErrors);
app.use(errorHandler_1.boomErrorHandler);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log('Listening in ' + port);
});
