const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const asyncMiddleware = require("../middleware/async");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const rentals = await Rental.find().sort("-dateOut");
    res.send(rentals);
  })
);

router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid movie.");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not in stock.");

    let rental;
    try {
      rental = new Rental({
        customer: {
          _id: customer._id,
          name: customer.name,
          isGold: customer.isGold,
          phone: customer.phone,
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
      });
      rental = await rental.save();
    } catch (ex) {
      return res.status(500).send("Failed to save rental.");
    }

    try {
      movie.numberInStock--;
      await movie.save();
    } catch (ex) {
      // Rollback: delete the rental if movie update fails
      await Rental.findByIdAndRemove(rental._id);
      return res
        .status(500)
        .send("Failed to update movie stock. Rental rolled back.");
    }

    res.send(rental);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental)
      return res
        .status(404)
        .send("The rental with the given ID was not found.");

    res.send(rental);
  })
);

module.exports = router;
