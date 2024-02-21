import winston from "winston";
import express from "express";
const app = express();

// import logging from "./startup/logging.js";
import routes from "./startup/routes.js";
import db from "./startup/db.js";
import config from "./startup/config.js";
import validation from "./startup/validation.js";

// logging();
routes(app);
db();
config();
validation();

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

export default server;
