import express from "express";
import logger from "./paintServices/loggingService";
import {
  checkDatabasePool,
  releaseAllConnections,
} from "./paintServices/databasePoolService";
import { checkVariablesExist } from "./paintServices/variablesService";
import initializeRoutes from "./paintServices/routeService";

// create Expresss application
const app = express();
// define the port where application listens
const port = process.env.PORT || 3000;

// add a graceful shutdown handler
process.on("SIGINT", async () => {
  // handle SIGINT (Ctrl+C) or other shutdown signals
  logger.info("Received shutdown signal. Releasing resources...");

  try {
    // perform cleanup and resource release operations
    // including release database connections
    await releaseAllConnections();
    logger.info("Pool ended and connections released.");
    // exit(0) - exiting application gracefully
    process.exit(0);
  } catch (err) {
    logger.error("Error during graceful application shutdown:", err);
    // exit(1) - exiting with error code
    process.exit(1);
  }
});

// confirms database pool available
checkDatabasePool();
// confirms environment variables are
// setup like PrivateKey and UpLoadPath
checkVariablesExist();
// passes Express instance (app) used to
// initialize routes including middleware
initializeRoutes(app);

// start HTTP server - a listener for application
export const server = app.listen(3000, "0.0.0.0", () =>
  logger.info(`Listening on port ${port}.`)
);
