import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized, token missing!" });
      }

      // Extract token
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token is missing or malformed!",
        });
      }

      // Verify JWT
      const decoded =  jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      // Attach user to request
      req.user = decoded;
      console.log(decoded);

      // Check role
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You do not have permission.",
        });
      }

      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        error: error.message,
      });
    }
  };
};

export default auth;
