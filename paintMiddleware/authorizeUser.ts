import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pathToRegexp, match, parse, compile } from "path-to-regexp";
const config = require("config");

interface CustomRequest extends Request {
  user?: jwt.JwtPayload; // Add your custom property here
}

export default function authorizeUser(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {

  const exceptions: string[] = [
    "/api/userAuthentication",
    "/api/pictureServer/(.*)", // Use "*" as a wildcard
  ];

  // Check if the requested path matches any of the exceptions using path-to-regexp
  const pathMatch = exceptions.some((exception) => {
    const regex = pathToRegexp(exception);
    return regex.exec(req.path)
  });

  if (pathMatch) {
    return next(); // Allow access to paths that match exceptions
  }

  const token = req.headers["x-userauthenticate-token"]; // .header("x-userAuthenticate-token");

  if (!token) return res.status(401).send("Access denied. No token provided.");

  // handle array of tokens
  const authToken = Array.isArray(token) ? token[0] : token;
  try {
    const decoded = jwt.verify(
      authToken,
      config.get("jwtPrivateKey")
    ) as JwtPayload;
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
}

