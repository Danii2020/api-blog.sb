"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const errorHandler_1 = require("./src/middlewares/errorHandler");
const routes_1 = require("./src/routes");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
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
