import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: jwt.JwtPayload; // Add your custom property here
}



export const verifyUserRole = (role: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
  
    if (req.user) {
    const allowedRoles: string = role;
    const userRole: string = req.user.user_role;
    const regex: RegExp = new RegExp(`\\b${userRole}\\b`);

    if (req.user.user_role === "") return res.status(403).send("Access denied.");

    if (req.user.user_role === "MANAGER") return next();

    if (regex.test(allowedRoles)) {
       next();
    } else {
         return res.status(403).send("Access denied.");
    }
    
    }

  };
};
