"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.errorHandler = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).json({
        status: "error",
        message,
        stack: err.isOperational ? undefined : err.stack,
    });
};
exports.errorHandler = errorHandler;
const createError = (message, statusCode) => {
    return new AppError(message, statusCode);
};
exports.createError = createError;
