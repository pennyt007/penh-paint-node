import mysql from "mysql2/promise";
import logger from "./loggingService";
const config = require("config");

// declaring the pool variable outside the function
// creates a shared variable that can be accessed
// and reused across multiple function calls. This
// allows the connection pool to persist throughout
// the lifetime of the application or module

// variable which holds the connection pool object
let pool: mysql.Pool | null = null;

// variable which holds the connecton object
let connection: mysql.PoolConnection | null = null;

// used to create pool if it does not exits
// called before executing any database queries
export async function checkDatabasePool() {
  if (!pool) {
    try {
      const dbConnectionInfo = config.get("db");
      const dbName = config.get("db.database");
      pool = mysql.createPool(dbConnectionInfo);

      // test pool connection
      const connection = await pool.getConnection();
      logger.info("Database Connection Successful.");
      connection.release();
      logger.info("Database Connection Released.");
    } catch (err) {
      logger.error(`Database Connection Failed --> ${err}`);
      // winston handles asynchronous code
      // and unhandled promise rejections.
      // This is were synchronous code error,
      // granular error handling and error
      // handling with clean-up can occur.
    }
  }

  return pool;
}

// used to create connection if it does not exits
// called before executing any database queries
export async function getPoolConnection() {
  const pool: mysql.Pool | null = await checkDatabasePool();
  try {
    if (pool) {
      // create pool connection
      connection = await pool.getConnection();
      logger.info("Database Connection Successful.");
    }
  } catch (err) {
    logger.error(`Database Connection Failed --> ${err}`);
    // winston handles asynchronous code
    // and unhandled promise rejections.
    // This is were synchronous code error,
    // granular error handling and error
    // handling with clean-up can occur.
  }
  return connection;
}

// used to release all connections and close the pool
export async function releaseAllConnections() {
  if (pool) await pool.end(); // Release all connections and close the pool
  logger.info("All connections released and pool closed.");
}

// used to start a database transaction
export async function beginTransaction(connection: mysql.PoolConnection) {
  try {
    await connection.beginTransaction();
    connection.release();
  } catch (error) {
    logger.error(`Failed to begin transaction`);
  }
}

// used to rollback a database transaction
export async function rollbackTransaction(connection: mysql.PoolConnection) {
  try {
    await connection.rollback();
    connection.release();
  } catch (error) {
    logger.error(`Transaction rollback failed.`);
  }
}

// used to commit a database transaction
export async function commitTransaction(connection: mysql.PoolConnection) {
  try {
    await connection.commit();
    connection.release();
  } catch (error) {
    logger.error(`Transaction commit failed.`);
  }
}

// by utilizing connection pooling, you can reuse
// connections from the pool instead of creating
// a new connection for each query. This helps optimize
// resource usage and prevents the "too many connections"
// error by managing and reusing connections effectively.
