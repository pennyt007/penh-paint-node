import mysql from "mysql2/promise";
import logger from "./loggingService";
import { checkDatabasePool } from "./databasePoolService";
import { checkResultIterable } from "./resultService";

// execute database query
export async function executeDatabaseQuery(
  queryName: string,
  queryDetails: string
) {
  try {
    // retrieves the connection pool
    const pool: mysql.Pool | null = await checkDatabasePool();

    if (pool) {
      // obtain connection from the pool
      const connection = await pool.getConnection();

      try {
        // query is executed using connection
        const results = await connection.query(queryDetails);
        return checkResultIterable(results);
      } finally {
        connection.release(); // Ensure the connection is always released.
      }
    } else {
      logger.error("Failed to obtain a database connection pool.");
    }
  } catch (err) {
    logger.error(`Database Query Failed --> ${queryName} --> ${err}`);
    throw err; // re-throw the error for logging and handling
  }
}

// execute database query using an existing connection
export async function executeDatabaseQueryWithConnection(
  queryName: string,
  queryDetails: string,
  connection: mysql.PoolConnection
) {
  try {
    // query is executed using the provided connection
    const results = await connection.query(queryDetails);
    return checkResultIterable(results);
  } catch (err) {
    logger.error(`Database Query Failed --> ${queryName} --> ${err}`);
    throw err; // re-throw the error for logging and handling
  }
}
