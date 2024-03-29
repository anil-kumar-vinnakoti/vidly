import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";
import { Genre, validateGenre as validate } from "../models/genre.js";
import express from "express";

const router = express.Router();

const adminRoutesParams = [auth, admin];

router.get("/", auth, async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", adminRoutesParams, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put(
  "/:id",
  [...adminRoutesParams, validateObjectId],
  async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
  }
);

router.delete(
  "/:id",
  [...adminRoutesParams, validateObjectId],
  async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
  }
);

router.get(
  "/:id",
  [...adminRoutesParams, validateObjectId],
  async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
  }
);
export default router;
