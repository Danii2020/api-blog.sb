const express = require('express');
import { Request, Response } from "express";
import { routerApi } from "./src/routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send("Hello, this is my server in Express");
});

routerApi(app);
app.listen(port, () => {
  console.log('Listening in ' + port);
})
