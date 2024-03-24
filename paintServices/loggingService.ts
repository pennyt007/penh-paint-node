import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({

  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      level: "error",
      filename: "penhLogs/penhError-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d"
    }),
    new DailyRotateFile({
      level: "info",
      filename: "penhLogs/penhInfo-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d"
    })
  ],
});

// catch unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Promise Rejection --> ${reason}`);
});

export default logger;
