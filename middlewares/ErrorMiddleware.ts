import { ApiException } from "../exception/ApiException";
import { NextFunction, Request, Response } from "express";

export function ErrorMiddleware(
  error: Error | ApiException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!error) next();
  if (error instanceof ApiException) {
    console.error(error.status, "\n", error.message);
    return res.status(error.status).json({ error: error.message });
  }
  console.log(error.name, "\n", error.message, "\n", error.stack);
  return res.status(500).json({ error: "Internal error" });
}
