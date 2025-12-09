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
          .json({ message: "Unauthorized, token missing!" });
      }
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      console.log({ token_without_bearer: token });

      if (!token) {
        return res.status(500).json({
          message: "you are not allowd!!",
        });
      }
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;
      console.log({ decoded });

      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(500).json({
          message: false,
          error: "unauthorised !!",
        });
      }
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
