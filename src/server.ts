const express = require('express');
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/errorHandler';
import { Request, Response } from "express";
import { routerApi } from "./routes";
import { config } from '../config/config';

const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded());
require('./utils/auth');

app.set('view engine', 'pug')

app.get('/', (req:Request, res:Response) => {
  res.render('index');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening in ' + port);
})

export {app}
