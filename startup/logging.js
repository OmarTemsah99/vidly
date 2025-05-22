const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
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
};
