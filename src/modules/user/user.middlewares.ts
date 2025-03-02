import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import errorHandler from "../../utils/errorHandler";
import User from "./user.model";
import jwt, { JwtPayload } from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new errorHandler(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    const user = await User.findById(decodedToken?._id).select(
      "-password -refresh_token"
    );

    if (!user) {
      throw new errorHandler(401, "Invalid access token");
    }

    (req as any).user = user;

    next();
  } catch (error) {
    throw new errorHandler(401, "Unauthorized request");
  }
});

const verifyRoleAccess = (allowedRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roleInDb = (req as any).user?.role;
    if (!(allowedRole === roleInDb)) {
      throw new errorHandler(403, "Access denied.");
    }
    next();
  };
};

export { verifyJWT, verifyRoleAccess };
