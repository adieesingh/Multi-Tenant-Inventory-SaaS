import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
 
    if (!token) {
      return res.status(400).json({
        message: "Token not found",
      });
    }
    const authHeader = token.startsWith("Bearer ") ? token.substring(7) : token;
    const decode = jwt.verify(
      authHeader,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;

    if (decode.id) {
      req.userId = decode.id;
      next();
    }
  } catch (error:any) {
    return res.status(500).json({
      message: "Internal Server Down",
      error:error.message
    });
  }
};
