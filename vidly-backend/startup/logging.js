import winston from "winston";
import "winston-mongodb";

export default function () {
  // Create a new Winston logger instance
  const logger = winston.createLogger({
    transports: [
      // Logging to console with colorization and pretty printing
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),
      // Logging uncaught exceptions to a file
      new winston.transports.File({
        filename: "uncaughtExceptions.log",
        level: "error",
      }),
      // Logging regular logs to a file
      new winston.transports.File({ filename: "logfile.log", level: "info" }),
      // Logging to MongoDB
      new winston.transports.MongoDB({
        db: "mongodb+srv://anil:Test1234@cluster1.zcf0yks.mongodb.net/node-tuts",
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        level: "info",
      }),
    ],
    // Handling exceptions not caught by transports
    exceptionHandlers: [
      new winston.transports.File({ filename: "exceptions.log" }),
    ],
    // Handling unhandled rejections
    rejectionHandlers: [
      new winston.transports.File({ filename: "rejections.log" }),
    ],
  });

  // Apply the logger to the current process
  winston.add(logger);

  // Handle uncaught exceptions in async operations
  // add alternate package for express-async-errors
}
