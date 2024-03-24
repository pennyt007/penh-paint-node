import jwt, { Jwt } from "jsonwebtoken";
const config = require("config");

// Create Token
export default function generateAuthenticateToken(user:jwt.JwtPayload) {
  const token = jwt.sign({ user }, config.get("jwtPrivateKey"));
  return token;
}
