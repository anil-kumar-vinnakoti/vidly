import express from "express";
import mongoose from "mongoose";
import { Movie } from "../models/movie.js";
import { Customer } from "../models/customer.js";
import { Rental, validateRental as validate } from "../models/rental.js";
import auth from "../middleware/auth.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Rental.create([rental], { session });

    await Movie.updateOne(
      { _id: movie._id },
      { $inc: { numberInStock: -1 } },
      { session }
    );

    await session.commitTransaction();
    res.send(rental);
  } catch (ex) {
    await session.abortTransaction();
    res.status(500).send("Something failed.");
  } finally {
    await session.endSession();
  }

  // try {
  //   new Fawn.Task()
  //     .save("rentals", rental)
  //     .update(
  //       "movies",
  //       { _id: movie._id },
  //       {
  //         $inc: { numberInStock: -1 },
  //       }
  //     )
  //     .run();

  //   res.send(rental);
  // } catch (ex) {
  //   res.status(500).send("Something failed.");
  // }
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});
export default router;
