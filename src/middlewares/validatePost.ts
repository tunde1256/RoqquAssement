import { Request, Response, NextFunction } from "express";
import { createError } from "./errorHandler";

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const { title, body, userId } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return next(createError("Title is required and should be a non-empty string", 400));
  }

  if (!body || typeof body !== "string" || body.trim() === "") {
    return next(createError("Body is required and should be a non-empty string", 400));
  }

  if (!userId || typeof userId !== "number") {
    return next(createError("User ID is required and should be a valid number", 400));
  }

  next();
};
