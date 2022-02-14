import { ApiException } from "../exception/ApiException";
import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token.service";

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) throw ApiException.forbidden("Uncorrent token");
  if (!tokenService.validateAccessToken(accessToken))
    throw ApiException.forbidden();
  next();
}
