import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; 
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    status: "error",
    message,
    stack: err.isOperational ? undefined : err.stack, 
  });
};

export const createError = (message: string, statusCode: number) => {
  return new AppError(message, statusCode);
};
