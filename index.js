require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const error = require("./middleware/error");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

// Configure winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "logfile.log",
    }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "error",
      collection: "logs",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "exceptions.log",
    }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      collection: "logs",
    }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "rejections.log",
    }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      collection: "logs",
    }),
  ],
});

// Exit on uncaught exceptions and rejections
winston.exceptions.handle(
  new winston.transports.Console({ format: winston.format.simple() }),
  new winston.transports.File({ filename: "exceptions.log" })
);

winston.rejections.handle(
  new winston.transports.Console({ format: winston.format.simple() }),
  new winston.transports.File({ filename: "rejections.log" })
);

process.on("exit", () => {
  winston.info("Process exiting...");
});

// const p = Promise.reject(new Error("Somthing failed miserably"));
// p.then(() => console.log("Done"));
// throw new Error("Something Failed during start up");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customer", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
