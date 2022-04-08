const express = require('express');
import { logErrors, errorHandler, boomErrorHandler } from './src/middlewares/errorHandler';

import { Request, Response } from "express";
import { routerApi } from "./src/routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send("Hello, this is my server in Express");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening in ' + port);
})
