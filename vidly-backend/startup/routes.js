import express from "express";
import login from "../routes/login.js";
import users from "../routes/users.js";
import movies from "../routes/movies.js";
import genres from "../routes/genres.js";
import rentals from "../routes/rentals.js";
import returns from "../routes/returns.js";
import error from "../middleware/error.js";
import customers from "../routes/customers.js";

export default function (app) {
  app.use(express.json());
  // user
  app.use("/login", login);
  app.use("/movies", movies);
  app.use("/rentals", rentals);
  app.use("/returns", returns);

  // admin
  app.use("/genres", genres);
  app.use("/customers", customers);
  app.use("/users", users);

  // error handling
  app.use(error);
}
