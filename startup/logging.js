require("express-async-errors");
const winston = require("winston");
require("winston-mongodb"); // might cause problems with integration testing if so just comment the related parts

module.exports = function () {
  winston.configure({
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

  process.on("exit", () => {
    winston.info("Process exiting...");
  });
};
