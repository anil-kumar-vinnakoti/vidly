import express from "express";
const app = express();
import dotenv from "dotenv";

import logging from "./startup/logging.js";
import routes from "./startup/routes.js";
import db from "./startup/db.js";
import validation from "./startup/validation.js";

dotenv.config();

logging();
routes(app);
db();
validation();

const port = process.env.PORT || 4500;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

export default server;
