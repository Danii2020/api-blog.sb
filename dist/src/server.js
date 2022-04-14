"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require('express');
const errorHandler_1 = require("./middlewares/errorHandler");
const routes_1 = require("./routes");
const config_1 = require("../config/config");
const app = express();
exports.app = app;
const port = config_1.config.port;
app.use(express.json());
require('./../utils/auth');
app.get('/', (req, res) => {
    res.send("Hello, this is my server in Express");
});
(0, routes_1.routerApi)(app);
app.use(errorHandler_1.logErrors);
app.use(errorHandler_1.boomErrorHandler);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log('Listening in ' + port);
});
