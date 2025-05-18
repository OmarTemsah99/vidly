const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

// GET all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// POST a new genre
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// PUT (update) a genre
router.put("/:id", async (req, res) => {
  // Validate the request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if genre exists
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  // Update genre
  res.send(genre);
});

// DELETE a genre
router.delete("/:id", async (req, res) => {
  // Check if genre exists
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  // Delete genre
  res.send(genre);
});

// GET a single genre by id
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

// Validation function
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).required(),
  };
  return Joi.object(schema).validate(genre);
}

module.exports = router;
