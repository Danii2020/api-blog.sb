const express = require('express');
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/errorHandler';
import { checkApiKey } from './middlewares/authHandler';
import { Request, Response } from "express";
import { routerApi } from "./routes";
import { config } from '../config/config';

const app = express();
const port = config.port;

app.use(express.json());
require('./utils/auth');

app.get('/', checkApiKey, (req:Request, res:Response) => {
  res.send("Hello, this is my server in Express");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening in ' + port);
})
