import logger from "./loggingService";
const config = require("config");

export function checkVariablesExist() {
  if (!config.get("jwtPrivateKey")) {
    logger.error(
      "Fatal Error --> jwtPrivateKey enviroment variable is not defined."
    );
    throw new Error(
      "Fatal Error --> jwtPrivateKey enviroment variable is not defined."
    );
  }

}
