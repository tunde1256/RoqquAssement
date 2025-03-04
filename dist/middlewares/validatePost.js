"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = void 0;
const errorHandler_1 = require("./errorHandler");
const validatePost = (req, res, next) => {
    const { title, body, userId } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
        return next((0, errorHandler_1.createError)("Title is required and should be a non-empty string", 400));
    }
    if (!body || typeof body !== "string" || body.trim() === "") {
        return next((0, errorHandler_1.createError)("Body is required and should be a non-empty string", 400));
    }
    if (!userId || typeof userId !== "number") {
        return next((0, errorHandler_1.createError)("User ID is required and should be a valid number", 400));
    }
    next();
};
exports.validatePost = validatePost;
