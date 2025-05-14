const express = require("express");
const Joi = require("joi");
const router = express.Router();

// Validation function
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.object(schema).validate(genre);
}

// In-memory genres array
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
];

// GET all genres
router.get("/", (req, res) => {
  res.send(genres);
});

// GET a single genre by id
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

// POST a new genre
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

// PUT (update) a genre
router.put("/:id", (req, res) => {
  // Check if genre exists
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  // Validate the request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update genre
  genre.name = req.body.name;
  res.send(genre);
});

// DELETE a genre
router.delete("/:id", (req, res) => {
  // Check if genre exists
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  // Delete genre
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

module.exports = router;
