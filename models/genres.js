const Joi = require("joi");
const mongoose = require("mongoose");

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

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).required(),
  };
  return Joi.object(schema).validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;
