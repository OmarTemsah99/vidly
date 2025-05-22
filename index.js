require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();

require("./startup/routes")(app);

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

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
