import express, { Express } from "express";
import cors from "cors";
import authorizeUser from "../paintMiddleware/authorizeUser";
const inventory = require("../paintRoutes/inventory");
const userAuthentication = require("../paintRoutes/userAuthentication");
const home = require("../paintRoutes/home");

export default function initializeRoutes(app: Express) {
  // express.json middleware in Express.js used
  // to parse incoming request bodies in JSON format.
  app.use(express.json());

  // cors middleware adds necessary HTTP headers
  // to server's responses, allowing cross-origin
  // requests from client applications.
  const corsOptions = { exposedHeaders: "x-userauthenticate-token" };
  app.use(cors(corsOptions));

  // custom middleware checks user logged
  // in has valid token then decodes payload
  // which contians user information.
  app.use(authorizeUser);

  //routes
  app.use("/", home);
  app.use("/api/inventory", inventory);
  app.use("/api/userAuthentication", userAuthentication);
}
